import { query } from 'express';
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
};

const handleGetCoachInforById = async (req, res) => {
    let coachId = req.query.coachId;
    let response = await coachService.getCoachInforById(coachId);
    return res.status(200).json(response);
};

const handleEditCoachDes = async (req, res) => {
    let data = req.body;
    let message = await coachService.editCoachInfor(data);
    return res.status(200).json({
        message,
    });
};

module.exports = {
    handleGetAllCoach: handleGetAllCoach,
    handleSaveCoachInfor: handleSaveCoachInfor,
    handleGetCoachDes: handleGetCoachDes,
    handleEditCoachDes: handleEditCoachDes,
    handleGetCoachInforById: handleGetCoachInforById,
};
