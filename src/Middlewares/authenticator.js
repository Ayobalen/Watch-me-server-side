const jwt = require('jsonwebtoken');
const configObj = require('../../config');

const unauthorizedResponse = (
    res,
    err,
    message = "You do not have enough permission to access this resource"
) => res.send(403, err, message )

class Middlewares{
    constructor(config = configObj){
        this.config = config;
        this.dependencies = dependencies;
        this.verifyAllUserToken = this.verifyAllUserToken.bind(this);
       
 }
 async verifyAllUserToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.send(
       403,
        'NO_TOKEN_FOUND',
        'Unauthorized. No token found in header',
      );
    }
    try {
      const jwtToken = authorization ? authorization.split(' ')[1] : undefined;

      if (!jwtToken) {
        return res.send(
          400,
          { token: 'TOKEN_ERROR' },
          'Token not formatted properly',
        );
      }
      if (jwtToken) {
        req.user = jwt.verify(jwtToken, process.env.JWT_SECRET);
        return next();
      }
      return unauthorizedResponse(res);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return unauthorizedResponse(res, 'EXPIRED_TOKEN', error.message);
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return unauthorizedResponse(res, 'INVALID_OR_BAD_TOKEN', error.message);
      }
      return res.send( 'UNKNOWN_ERROR_OCURRED', error.message);
    }
}
async optionalTokenCheck(req, res, next) {
    req.user = {};
    const { authorization } = req.headers;
    try {
      // Check for falsy value or set
      const jwtToken = authorization ? authorization.split(' ')[1] : undefined;

      if (!jwtToken) {
        // Valid JWT Check
        return next();
      }
      if (jwtToken) {
        req.user = jwt.verify(jwtToken, this.config.SEC);
        // we are supposed to use the data here for next level stuff!
        return next();
      }
      return next();
    } catch (error) {
      req.user = {};
      return next();
    }
  }

  verifySuperAdmin(req, res, next) {
    if (req.user.is_admin && req.user.role === 'SUPER_ADMIN') {
      return next();
    }
    return unauthorizedResponse(res, { err: 'UNAUTHORIZED' });
  }
}
module.exports = Middlewares;