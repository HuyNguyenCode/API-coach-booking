/*
  Seeder dùng để tạo để tạo dữ liệu cho các thuộc tính => Tạo các hàng
*/

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Kay',
      lastName: 'Nguyen',
      address: 'USA',
      gender: 1,
      roleID: "R1",
      phoneNumber: "+157865412",
      positionID: "PhD",
      image:"D:/Project/Image",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
