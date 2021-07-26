const router = require("express").Router();

router.get("/work-orders", (req, res) => {
  res.render("work-orders");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
