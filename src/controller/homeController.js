import { promiseImpl } from 'ejs';
import db from '../models/index';
import CRUDService from '../services/CRUDService';

// Home page
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

// About page
let getAboutPage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('aboutme.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

//========== CREATE ===========
// Show CRUD form to get data form input
let getCRUD = (req, res) => {
    try {
        return res.render('crud.ejs');
    } catch (error) {
        console.log(error);
    }
};

//========== READ ===========
// Display the data in the DB as a table in the webview to update or delete
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', { usersData: data });
};

// POST crud to the server to create a new data
let postCRUD = async (req, res) => {
    await CRUDService.creatNewUser(req.body);
    return res.send('Create a new user successfull');
};

//========== UPDATE ===========
// Show edit form to edit data after clicking the "Edit" button
/* Get id of the user => Passing to getUserInforByID() function to get the information 
of that user => Show the eidt data form with value of the input feild corresponding 
to the information of the user
*/
let getEditCRUD = async (req, res) => {
    let userID = req.query.id; // get id
    //pasing the id to getUserInforByID() function to get information of user
    let userData = await CRUDService.getUserInforByID(userID);
    return res.render('editCRUD.ejs', { user: userData });
};

// PUT crud to server to update data
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', { usersData: allUsers });
};

//========== DELETE ===========
// Delete data
let deleteCRUD = async (req, res) => {
    let userID = req.query.id; // get id
    if (userID) {
        await CRUDService.deleteUserByID(userID);
        return res.send('Delete the user successful!');
    } else {
        return res.send('User not found');
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
