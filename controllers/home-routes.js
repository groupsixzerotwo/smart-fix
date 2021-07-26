const router = require("express").Router();

router.get("/work-orders", (req, res) => {
  res.render("work-orders");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/posts", (req, res) => {
  res.render("post");
});

module.exports = router;
