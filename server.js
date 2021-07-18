const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//-----MIDDLEWARE-----//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----CONNECT TO THE DATABASE-----//
sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log('Now istening'));
})