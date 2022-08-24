const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateCode = require('../utils/helpers');

class AuthController {
   constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.verifyEmail = this.verifyEmail.bind(this)

   }

   // login

   async login (req, res){
      const { email, password } = req.body
      const auth = await Auth.findOne( email ).lean();
      if(!auth)
      throw new this.e.unauthorizedError('You do not have an account with us , please signup')
   if(!auth.is_verified)
    return res.send( 307, 'Please verify your account' )

    const checkPassword = await bcrypt.compare(password, auth.password)
    if(!checkPassword)
    throw new this.e.unathorisedError('Invalid password')

   const user = { auth }
   const token = jwt.sign(user, process.env.JWT_SECRET, { expires: '3 days'});
   const response = {user_data : auth.user, token, expires : '3 days'}
  return res.send(200, response , 'You have successfully logged in' )
}

   // verifyEmail

   async verifyEmail (req, res){
   const { token } = req.body
   const { authExist } = await Auth.findone({token});
   if (!authExist){
    throw new this.e.unauthorizedError('User does not exist')
   }
   if(authExist.token !== token ){
   throw new this.e.unauthorizedError('Invalid token , please check email for the right token')
   }
   if(authExist.is_verified){
    res.send( 307,  " Email has already been verified ")
   }
   authExist.is_pre_verified = true;


   authExist.is_verified = true;
   authExist.token = null ;

   await authExist.save();
   return res.send ( 201, "Email has been succesfully verified")
}


   //
}

module.export = AuthController;