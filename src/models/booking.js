/*
  Models dùng để tạo ra Class, đối tượng => Các cột => Cụ thể là quy định datatype 
  cho các thuộc tính đó
*/
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      statusID: DataTypes.INTEGER,
      coachID: DataTypes.INTEGER,
      studentID: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
