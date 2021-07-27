//Import sequelize constructor
const Sequelize = require("sequelize");

require("dotenv").config();

//create conncection to db and pass mysql information
const sequelize = new Sequelize(
  "smart_fix_db",
  "root",
  "LaptopWaterParis1027$",
  {
    host: "localhost",
    dialect: "mysql",
    port: "3306",
  }
);

module.exports = sequelize;
