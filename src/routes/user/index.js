const { router } = require('express')
const errors = require('../../../utils/errors');

const auth = require('../../../middlewares/authenticator');
const UserController = require('../../../controllers/User.controller');
const AuthController = require('../../../controllers/Auth.controller');

const dependencies = {
    logger,
    env,
    errors,
}

const router = new Router();

const userController = new UserController(dependencies);
const authController = new AuthController(dependencies);

router.post(
    'users/signup',
    userController.signup,
);
