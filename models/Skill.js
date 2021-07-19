const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Skill extends Model {}

//-----INITIALIZE SKILL-----//
Skill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    skill_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Skill;