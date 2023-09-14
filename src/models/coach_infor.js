/*
  Models dùng để tạo ra Class, đối tượng => Các cột => Cụ thể là quy định datatype 
  cho các thuộc tính đó
*/

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Coach_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Coach_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' });
            Coach_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' });
            Coach_Infor.belongsTo(models.Allcode, { foreignKey: 'nationId', targetKey: 'keyMap', as: 'nationData' });
            Coach_Infor.belongsTo(models.User, { foreignKey: 'coachId' });
            Coach_Infor.belongsTo(models.Speciality, {
                foreignKey: 'specialtyId',
                targetKey: 'id',
                as: 'specialtyData',
            });
        }
    }
    Coach_Infor.init(
        {
            coachId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
            classroomId: DataTypes.INTEGER,
            priceId: DataTypes.STRING,
            nationId: DataTypes.STRING,
            paymentId: DataTypes.STRING,
            nameClass: DataTypes.STRING,
            note: DataTypes.STRING,
            count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Coach_Infor',
            freezeTableName: true,
        },
    );
    return Coach_Infor;
};
