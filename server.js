const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

//-----MIDDLEWARE-----//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//-----CONNECT TO THE DATABASE-----//
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('Now istening'));
})