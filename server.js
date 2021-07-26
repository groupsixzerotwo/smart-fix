const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log("working");
});

app.use(require("./controllers"));
