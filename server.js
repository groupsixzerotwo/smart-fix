const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

//-----MIDDLEWARE-----//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//-----CONNECT TO THE DATABASE-----//
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});
