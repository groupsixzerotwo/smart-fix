const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/wof", (req, res) => {
  res.render("post");
});

module.exports = router;
