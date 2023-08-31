/*
  Models dùng để tạo ra Class, đối tượng => Các cột => Cụ thể là quy định datatype 
  cho các thuộc tính đó
*/
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Markdown.belongsTo(models.User, { foreignKey: 'coachId' });
        }
    }
    Markdown.init(
        {
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
            description: DataTypes.TEXT('long'),
            coachId: DataTypes.INTEGER,
            specialityId: DataTypes.INTEGER,
            classroomId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Markdown',
        },
    );
    return Markdown;
};
