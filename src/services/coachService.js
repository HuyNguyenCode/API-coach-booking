import db from '../models/index';

const getAllCoach = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allCoach = await db.User.findAll({
                limit: limitInput,
                where: { roleID: 'Coach' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'],
                },
                // include: [
                //     { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                //     { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                // ],
                raw: true,
                nest: true,
            });
            res.errCode = 0;
            res.data = allCoach;
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllCoach: getAllCoach,
};
