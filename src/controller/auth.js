const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateCode = require('../utils/helpers');

class AuthController {
   constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.verifyEmail = this.verifyEmail.bind(this)
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
   authExist.is_verified = true;
   authExist.token = null ; 
   await authExist.save();
   return res.send ( 201, "Email has been succesfully verified")
}


   //
}

