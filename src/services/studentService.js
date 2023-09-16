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
                let firstName = '';
                let lastName = '';
                if (dataInput.fullName) {
                    let names = dataInput.fullName.split(' ');
                    firstName = names[0];
                    lastName = names[1];
                }
                let users = await db.User.findOrCreate({
                    where: { email: dataInput.email },
                    defaults: {
                        email: dataInput.email,
                        phoneNumber: dataInput.phoneNumber,
                        address: dataInput.address,
                        positionID: 'None',
                        firstName: firstName,
                        lastName: lastName,
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

const getBookAppointment = (coachId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!coachId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let studentInfor = await db.Booking.findAll({
                    where: { coachId: coachId, date: date },
                    raw: false,
                    nest: true,
                    include: [
                        {
                            model: db.User,
                            as: 'studentData',
                            attributes: ['email', 'firstName', 'lastName', 'address', 'phoneNumber'],
                        },
                    ],
                });
                if (!studentInfor) {
                    resolve({
                        errCode: 1,
                        errMessage: 'User not found',
                    });
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'Get infor student successful',
                        data: studentInfor,
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,
    getBookAppointment: getBookAppointment,
};
