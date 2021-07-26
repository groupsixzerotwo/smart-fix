const router = require('express').Router();
const sequelize = require('../../config/connection')
const { Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

//-----LOGIN ROUTE-----//
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  }
  res.render('login');
})
module.exports = router;