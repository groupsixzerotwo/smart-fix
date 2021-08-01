const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//-----MIDDLEWARE-----//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
  secret: 'This is the group project',
  cookie: {maxAge: 3600000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess));
app.use(routes);

//-----CONNECT TO THE DATABASE-----//
sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log('Now Listening'));
})