import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(e);
        }
    });
};

let handleUserLogin = (email, password) => {
    let userStatus = { errCode: 0, message: 'loggined in successfull' };
    return new Promise(async (resolve, reject) => {
        try {
            if (await checkUserEmail(email)) {
                // check the user's email again to make sure that the user's information is not deleted after the previous check
                let user = await db.User.findOne({
                    //If the user exists with provided email, only the following properties are displayed:'email', 'roleid', 'password'
                    attributes: ['email', 'roleid', 'password'],
                    where: { email: email },
                    raw: true, //get the raw data as an object to remove the password attribute
                });
                if (user) {
                    // after checking that there exists a user with checked email then go to check password
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userStatus;
                        delete user.password;
                        userStatus.userInfor = user;
                    } else {
                        userStatus.errCode = 3;
                        userStatus.message = 'Wrong password';
                    }
                } else {
                    userStatus.errCode = 2;
                    userStatus.message = "User's not found";
                }
                resolve(userStatus);
            } else {
                userStatus.errCode = 1;
                userStatus.message = "Your email isn't exist, please try another eamil";
                resolve(userStatus);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllUsers = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userID === 'All') {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            } else if (userID && userID !== 'All') {
                user = await db.User.findOne({
                    where: { id: userID },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }

            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

var salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailCheck = await checkUserEmail(data.email);
            if (emailCheck) {
                resolve({
                    errCode: 1,
                    message: "Your email isn't exist, please try another eamil",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    password: hashPasswordFromBcrypt,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === '1' ? true : false,
                    roleid: data.roleid,
                    phoneNumber: data.phoneNumber,
                });
                resolve({
                    errCode: 0,
                    message: 'Create user successfull',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID },
            });
            if (user) {
                await db.User.destroy({
                    where: { id: userID },
                });
                resolve({
                    errCode: 0,
                    message: 'Delete the user successful!',
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User not found',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update user successful',
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    checkUserEmail: checkUserEmail,
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};
