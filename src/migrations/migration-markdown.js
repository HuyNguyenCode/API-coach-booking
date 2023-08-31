/*
  Migration dùng để tạo ra bảng với thông tin gồm: Tên bảng và các thuộc tính của bảng 
  (setup properties cho các thuộc tính)
*/

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long'),
            },
            coachId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            specialityId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            classroomId: {
                allowNull: false,
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
        await queryInterface.dropTable('markdowns');
    },
};
