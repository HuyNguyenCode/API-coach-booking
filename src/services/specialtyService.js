import { forEach } from 'lodash';
import db from '../models/index';

const saveSpecialtyInfor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.specialityName || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                await db.Speciality.create({
                    image: data.specialityImage,
                    name: data.specialityName,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Save specialty infor succesfull',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Speciality.findAll();
            specialties = specialties.map((item) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }
                return {
                    ...item,
                };
            });

            resolve({
                errCode: 0,
                errMessage: 'Get all specialties successful',
                data: specialties,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    saveSpecialtyInfor: saveSpecialtyInfor,
    getAllSpecialties: getAllSpecialties,
};
