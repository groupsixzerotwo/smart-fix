const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const invoiceGen = require('../utils/invoiceGen');

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
    order_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    //Assignment start date
    start_date : {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    //Assignment complete date
    complete_date: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    approved_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
  },
  {
    hooks: {
      async afterCreate(newAssignData) {
        newAssignData.order_number = await invoiceGen(newAssignData.id);
        return newAssignData;
      }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'assignment',
  }
);

module.exports = Assignment;