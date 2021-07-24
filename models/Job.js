const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Job extends Model {}

//-----INITIALIZE JOB-----//
Job.init(
  {
    //id for job
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //job text
    job_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //address for the job
    job_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //contact number of the party
    job_contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,  
      }
    },
    //Optional to add media
    job_media: {
      allowNull: true,
      type: DataTypes.STRING
    },
    //status of the assignment
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    //user id reference
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
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'job',
  }
);

module.exports = Job;