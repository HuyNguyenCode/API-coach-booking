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

const handleCreateUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
    let userID = req.body.id;
    if (userID) {
        let message = await userService.deleteUser(userID);
        return res.status(200).json(message);
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
        });
    }
};

const handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
};

const handleGetAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error form server',
        });
    }
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleGetAllCode: handleGetAllCode,
};
