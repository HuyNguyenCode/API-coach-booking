import db from '../models/index';
import { Buffer } from 'buffer';
import _, { reject } from 'lodash';
import { resolve } from 'path';
require('dotenv').config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

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
                include: { model: db.Markdown, attributes: ['description'] },
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

const saveCoachInfor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (
                !inputData.coachId ||
                !inputData.contentMarkdown ||
                !inputData.coachId ||
                !inputData.priceId ||
                !inputData.nationId ||
                !inputData.paymentId ||
                !inputData.nameClass
            ) {
                res.errCode = 1;
                res.errMessage = 'Missing paramteter';
                resolve(res);
            } else {
                res.errCode = 0;
                res.errMessage = 'Save coach infor successful';

                //Upsert markdown
                let markdown = await db.Markdown.findOne({
                    where: { coachId: inputData.coachId },
                    raw: false,
                });
                if (markdown) {
                    markdown.description = inputData.description;
                    markdown.contentMarkdown = inputData.contentMarkdown;
                    markdown.contentHTML = inputData.contentHTML;
                    await markdown.save();
                    resolve(res);
                } else {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        coachId: inputData.coachId,
                    });
                    resolve(res);
                }

                //Upsert coach_infor
                let coachInfor = await db.Coach_Infor.findOne({
                    where: { coachId: inputData.coachId },
                    raw: false,
                });
                if (coachInfor) {
                    console.log('Coach founded');
                    coachInfor.priceId = inputData.priceId;
                    coachInfor.nationId = inputData.nationId;
                    coachInfor.paymentId = inputData.paymentId;
                    coachInfor.nameClass = inputData.nameClass;
                    coachInfor.note = inputData.note;
                    await coachInfor.save();
                    resolve(res);
                } else {
                    console.log('Coach not found');
                    db.Coach_Infor.create({
                        coachId: inputData.coachId,
                        priceId: inputData.priceId,
                        nationId: inputData.nationId,
                        paymentId: inputData.paymentId,
                        nameClass: inputData.nameClass,
                        note: inputData.note,
                    });
                    resolve(res);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getCoachDes = (coachIdInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = '';
            let res = {};
            if (coachIdInput) {
                data = await db.Markdown.findOne({
                    where: { coachId: coachIdInput },
                });
                res.errCode = 0;
                res.errMessage = 'Get coach infor successful';
                res.data = data;
            }
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

const getCoachInforById = (coachId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!coachId) {
                res.errCode = 1;
                res.errMessage = 'Missing required parameter';
                resolve(res);
            } else {
                let coachInfor = await db.User.findOne({
                    where: { id: coachId },
                    raw: true,
                });
                if (coachInfor) {
                    if (coachInfor.image) {
                        coachInfor.image = Buffer.from(coachInfor.image, 'base64').toString('binary');
                    }
                    res.errCode = 0;
                    res.errMessage = 'User found';
                    res.data = coachInfor;
                } else {
                    res.errCode = 2;
                    res.errMessage = 'User not found';
                    res.data = {};
                }
                resolve(res);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getCoachInforBooking = (coachId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            if (!coachId) {
                res.errCode = 1;
                res.errMessage = 'Missing required parameter ';
                resolve(res);
            } else {
                let coachInforBooking = await db.Coach_Infor.findOne({
                    where: { coachId: coachId },
                    raw: false,
                    nest: true,
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn'] },
                        { model: db.Allcode, as: 'nationData', attributes: ['valueEn'] },
                    ],
                });
                if (coachInforBooking) {
                    res.errCode = 0;
                    res.errMessage = 'Coach founded ';
                    res.data = coachInforBooking;
                    resolve(res);
                } else {
                    res.errCode = 2;
                    res.errMessage = 'Coach not found ';
                    res.data = {};
                    resolve(res);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

const editCoachDes = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let markdown = await db.Markdown.findOne({
                where: { coachId: data.coachId },
                raw: false,
            });
            if (markdown) {
                console.log(data);
                markdown.description = data.description;
                markdown.contentMarkdown = data.contentMarkdown;
                markdown.contentHTML = data.contentHTML;
                await markdown.save();
                resolve({
                    errCode: 0,
                    message: 'Update markdown successful',
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'Markdonw not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(data);
            if (!data.arrSchedule || !data.coachId || !data.date) {
                resolve({
                    errCode: 1,
                    message: 'Missing required param!',
                });
            } else {
                if (data.arrSchedule && data.arrSchedule.length > 0) {
                    data.arrSchedule = data.arrSchedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
                let exitsting = await db.Schedule.findAll({
                    where: { coachId: data.coachId, date: data.date },
                    attributes: ['timeType', 'date', 'coachId', 'maxNumber'],
                    raw: true,
                });

                const toCreate = _.differenceWith(data.arrSchedule, exitsting, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(data.arrSchedule);
                    // console.log(data.arrSchedule);
                    resolve({
                        errCode: 0,
                        message: 'Bulk create successful',
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getScheduleByDate = (coachId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(data);
            if (!coachId || !date) {
                resolve({
                    errCode: 1,
                    message: 'Missing required param!',
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        coachId: coachId,
                        date: date,
                    },
                    include: [{ model: db.Allcode, as: 'timePeriod', attributes: ['valueEn'] }],
                    raw: false,
                    nest: true,
                });
                if (!dataSchedule) {
                    dataSchedule = [];
                }
                resolve({
                    errCode: 0,
                    message: 'Get schedule by date successful',
                    data: dataSchedule,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllCoach: getAllCoach,
    saveCoachInfor: saveCoachInfor,
    getCoachInforBooking: getCoachInforBooking,
    getCoachDes: getCoachDes,
    editCoachDes: editCoachDes,
    getCoachInforById: getCoachInforById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
};
