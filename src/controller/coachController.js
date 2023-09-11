import coachService from '../services/coachService';

const handleGetAllCoach = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await coachService.getAllCoach(limit);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error form server',
        });
    }
};

const handleSaveCoachInfor = async (req, res) => {
    try {
        let inputData = req.body;
        console.log(inputData);
        let response = await coachService.saveCoachInfor(inputData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

const handleGetCoachDes = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
            });
        } else {
            let data = await coachService.getCoachDes(id);
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

const handleGetCoachInforById = async (req, res) => {
    try {
        let coachId = req.query.coachId;
        let response = await coachService.getCoachInforById(coachId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

const handleGetCoachInforBooking = async (req, res) => {
    try {
        let response = await coachService.getCoachInforBooking(req.query.coachId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from server',
        });
    }
};

const handleEditCoachDes = async (req, res) => {
    try {
        let data = req.body;
        let message = await coachService.editCoachDes(data);
        return res.status(200).json({
            message,
        });
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

const handleBulkCreateSchedule = async (req, res) => {
    try {
        let inputData = req.body;
        let response = await coachService.bulkCreateSchedule(inputData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

const handleGetScheduleByDate = async (req, res) => {
    try {
        let inputCoachId = req.query.coachId;
        let inputDate = req.query.date;
        let response = await coachService.getScheduleByDate(inputCoachId, inputDate);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

const handleGetCoachInforProfile = async (req, res) => {
    try {
        let response = await coachService.getCoachInforProfile(req.query.coachId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

module.exports = {
    handleGetAllCoach: handleGetAllCoach,
    handleSaveCoachInfor: handleSaveCoachInfor,
    handleGetCoachDes: handleGetCoachDes,
    handleEditCoachDes: handleEditCoachDes,
    handleGetCoachInforById: handleGetCoachInforById,
    handleBulkCreateSchedule: handleBulkCreateSchedule,
    handleGetScheduleByDate: handleGetScheduleByDate,
    handleGetCoachInforBooking: handleGetCoachInforBooking,
    handleGetCoachInforProfile: handleGetCoachInforProfile,
};
