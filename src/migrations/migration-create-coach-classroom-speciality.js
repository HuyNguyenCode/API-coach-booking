/*
  Migration dùng để tạo ra bảng với thông tin gồm: Tên bảng và các thuộc tính của bảng 
  (setup properties cho các thuộc tính)
*/

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('coach_classroom_speciality', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            coachID: {
                type: Sequelize.INTEGER,
            },
            classroomID: {
                type: Sequelize.INTEGER,
            },
            specialityID: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('coach_classroom_speciality');
    },
};
