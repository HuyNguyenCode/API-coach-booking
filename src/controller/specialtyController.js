import specialtyService from '../services/specialtyService';

const handleSaveSpecialtyInfor = async (req, res) => {
    try {
        let response = await specialtyService.saveSpecialtyInfor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};

module.exports = {
    handleSaveSpecialtyInfor: handleSaveSpecialtyInfor,
};
