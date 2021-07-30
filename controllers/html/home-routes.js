const router = require('express').Router();
const sequelize = require('../../config/connection')
const { Service } = require('../../models');

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
});

//-----LOGIN ROUTE-----//
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  }
  res.render('login');
});

//-----SIGNUP ROUTE-----//
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  }

  Service.findAll({
    attributes: ['id', 'service_type']
  })
  .then(dbServiceData => {
    const services = dbServiceData.map(service => service.get({ plain: true}));
    res.render('signup', {services});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;