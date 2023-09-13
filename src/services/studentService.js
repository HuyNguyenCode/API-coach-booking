import db from '../models/index';
const postBookAppointment = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.email || !dataInput.coachId || !dataInput.date || !dataInput.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let users = await db.User.findOrCreate({
                    where: { email: dataInput.email },
                    defaults: {
                        email: dataInput.email,
                        roleid: 'Student',
                    },
                });
                if (users && users[0]) {
                    await db.Booking.findOrCreate({
                        where: { id: users[0].id },
                        defaults: {
                            statusId: 'S1',
                            coachId: dataInput.coachId,
                            studentId: users[0].id,
                            date: dataInput.date,
                            timeType: dataInput.timeType,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor student successful',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    postBookAppointment: postBookAppointment,
};
