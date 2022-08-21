const User = require('../models/User');
const Auth = require('../models/Auth');
const generateCode = require('../utils/helpers');


class UserController {
    constructor(dependencies = {}) {
        this.dependencies = dependencies;
        this.signup = this.signup.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    // Signup
    async signup(req, res) {
        const { email } = req.body;
        const { authExist } = await User.findOne({ email });
        if((authExist)) {
        if (authExist) {
            return res.status(400).json({
                message: 'Email already exists, please use a different email',
            });
        }
            if (!authExist.is_verified){
                return res.status(400).json({
                    message: 'Email already exists, please use a different email',
                });
            }
        }
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const token = generateCode(6);
        await Auth.create({
            email: req.body.email,
            user: user._id,
            password: req.body.password,
            token: token,
        })
        return res.status(200).json({
            'message': 'Signup successful',
        } 
           ( `please check ${req.body.email} for verification code`)
    );
    }

    // getUser

    async getUser(req, res) {
        const { user_Id } = req.params;
        const user = await User.findById(user_Id).lean();
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User retrieved successfully',
            user,
        });
    }

    // getAllUsers
    async getAllUsers(req, res) {
        const users = await User.find().lean();
        if (!users) {
            return res.status(404).json({
                message: 'No users found',
            });
        }
        return res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    }

    // deleteUser
    async deleteUser(req, res) {
        const { user_Id } = req.params;
        const user = await User.findById(user_Id).lean();
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        await User.findByIdAndDelete(user_Id);
        return res.status(200).json({
            message: 'User deleted successfully',
        });
    }
}

module.exports = UserController;