const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Service extends Model {}

//-----INITIALIZE SERVICE-----//
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'service'
  }
);

module.exports = Service;