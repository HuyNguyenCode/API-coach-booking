import db from '../models/index';
import userService from '../services/userService';

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let userStatus = await userService.handleUserLogin(email, password);

    if (!email || !password) {
        userStatus.errCode = 1;
        userStatus.message = 'Missing inputs parameter';
        return res.status(500).json({
            userStatus,
        });
    } else {
        return res.status(200).json({
            errCode: userStatus.errCode,
            message: userStatus.message,
            user: userStatus.userInfor ? userStatus.userInfor : {},
        });
    }
};

const handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
            user: [],
        });
    } else {
        let users = await userService.getAllUsers(id);
        return res.status(200).json({
            errCode: 0,
            message: 'Ok',
            users,
        });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
};
