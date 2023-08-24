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

module.exports = {
    handleGetAllCoach: handleGetAllCoach,
};
