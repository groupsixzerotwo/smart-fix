const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Status extends Model {}

//-----INITIALIZE STATUS-----//
Status.init(
  {
    //Id for status
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status_text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'status'
  }
);

module.exports = Status;