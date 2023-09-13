/*
  Models dùng để tạo ra Class, đối tượng => Các cột => Cụ thể là quy định datatype 
  cho các thuộc tính đó
*/
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Speciality extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Speciality.init(
        {
            image: DataTypes.BLOB,
            name: DataTypes.STRING,
            descriptionHTML: DataTypes.TEXT('long'),
            descriptionMarkdown: DataTypes.TEXT('long'),
        },
        {
            sequelize,
            modelName: 'Speciality',
        },
    );
    return Speciality;
};
