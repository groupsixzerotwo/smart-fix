const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPass) {
    return bcrypt.compareSync(loginPass, this.password);
  }
}

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
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'service',
        key: 'id'
      }
    }
  },
  {
    //Hashing
    hooks: {
      // set up beforeBulkCreate lifecycle "hook" functionality to hash password
      async beforeBulkCreate(bulkUserData) {
        return Promise.all(bulkUserData.map(async (userData) => {
          userData.password = await bcrypt.hash(userData.password, 10);
        }));
      },
      // set up beforeCreate lifecycle "hook" functionality to hash password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality to hash password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;