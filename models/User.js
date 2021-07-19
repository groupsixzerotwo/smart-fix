const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

//-----INITIALIZE USER-----//
User.init(
  {
    //Id coloumn for User
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //username coloumn for User
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //email coloumn for User
    email: {type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        //Format check
        isEmail: true
      }
    },
    //password coloumn for User
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //Must be at least eight characters long
        len: [8]
      }
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    //Hashing
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;