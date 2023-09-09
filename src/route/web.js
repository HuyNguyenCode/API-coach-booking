import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';
import coachController from '../controller/coachController';
let router = express.Router();

let initWebRoutes = (app) => {
    //Get Home Page
    router.get('/', homeController.getHomePage);

    //Get About Page
    router.get('/about', homeController.getAboutPage);

    //========== CREATE ===========
    // Show CRUD form to get data form input
    router.get('/crud-form', homeController.getCRUD);
    // POST crud to the server to create a new data
    router.post('/post-crud', homeController.postCRUD);

    //========== READ ===========
    // Display the data in the DB as a table in the webview to update or delete
    router.get('/get-crud', homeController.displayGetCRUD);

    //========== UPDATE ===========
    // Show edit form to edit data after clicking the "Edit" button
    router.get('/editCRUD', homeController.getEditCRUD);
    // PUT crud to server to update data
    router.post('/put-crud', homeController.putCRUD);

    //========== DELTETE ===========
    // Delete data
    router.get('/delete-crud', homeController.deleteCRUD);

    //========== Login API ===========
    router.post('/api/login', userController.handleLogin);

    //========== User API ===========
    router.get('/api/get-all-users', userController.handleGetAllUsers); //Render user
    router.get('/api/get-all-code', userController.handleGetAllCode); //Get all code
    router.post('/api/create-user', userController.handleCreateUser); //Create user
    router.put('/api/edit-user', userController.handleEditUser); //Update user
    router.delete('/api/delete-user', userController.handleDeleteUser); //Delete user

    //========== Coach API ===========
    router.get('/api/get-all-coach', coachController.handleGetAllCoach); //Get all coach
    router.post('/api/save-coach-infor', coachController.handleSaveCoachInfor); // Save coach infor
    router.get('/api/get-coach-des', coachController.handleGetCoachDes); // Get coach des
    router.put('/api/edit-coach-des', coachController.handleEditCoachDes); // Edit coach infor
    router.get('/api/get-coach-infor-by-id', coachController.handleGetCoachInforById); // Get coach des
    router.get('/api/get-coach-infor-booking', coachController.handleGetCoachInforBooking); // Get coach des
    router.post('/api/bulk-create-schedule', coachController.handleBulkCreateSchedule); // Get coach des
    router.get('/api/get-schedule-by-date', coachController.handleGetScheduleByDate); // Get coach des
    return app.use('/', router);
};

module.exports = initWebRoutes;
