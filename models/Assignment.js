const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Assignment extends Model {}

//-----INITIALIZE ASSIGNMENT-----//
Assignment.init(
  {
    //Id for Assignment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //Cost for Assignment
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    //Order number for Assignment
    Order_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date : {
      type: DataTypes.STRING,
      allowNull: true
    },
    complete_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //job id for the assignment
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job',
        key: 'id'
      }
    },
    //Service provider user for the assignment
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }
)