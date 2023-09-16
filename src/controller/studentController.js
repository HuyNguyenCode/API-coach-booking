import studentService from '../services/studentService';

const handlePostBookAppointment = async (req, res) => {
    try {
        let response = await studentService.postBookAppointment(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

const handleGetBookAppointment = async (req, res) => {
    try {
        let response = await studentService.getBookAppointment(req.query.coachId, req.query.date);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
module.exports = {
    handlePostBookAppointment: handlePostBookAppointment,
    handleGetBookAppointment: handleGetBookAppointment,
};
