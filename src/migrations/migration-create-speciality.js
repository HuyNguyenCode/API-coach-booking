/*
  Migration dùng để tạo ra bảng với thông tin gồm: Tên bảng và các thuộc tính của bảng 
  (setup properties cho các thuộc tính)
*/

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('specialities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            descriptionHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            descriptionMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            image: {
                type: Sequelize.BLOB,
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
        await queryInterface.dropTable('specialities');
    },
};
