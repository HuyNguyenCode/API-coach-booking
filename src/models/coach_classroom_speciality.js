/*
  Models dùng để tạo ra Class, đối tượng => Các cột => Cụ thể là quy định datatype 
  cho các thuộc tính đó
*/
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coach_Classroom_Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coach_Classroom_Speciality.init(
    {
      coachID: DataTypes.INTEGER,
      studentID: DataTypes.INTEGER,
      classroomID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Coach_Classroom_Speciality",
    }
  );
  return Coach_Classroom_Speciality;
};
