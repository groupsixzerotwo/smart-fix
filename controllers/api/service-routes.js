const router = require('express').Router();
const { Service } = require('../../models');

//-----GET - FIND ALL SERVICES-----//
router.get('/', (req, res) => {
  //Access Service model and run .findAll() method
  Service.findAll({})
  .then(dbServiceData => res.json(dbServiceData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE SERVICE-----//
router.get('/:id', (req, res) => {
  //Access Service model and run .findAll() method
  Service.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbServiceData => {
    if(!dbServiceData) {
      res.status(404).json({message: 'No Service found with this id'});
      return;
    }
    res.json(dbServiceData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----POST - ADD A SERVICE-----//
router.post('/', (req, res) => {
  Service.create({
    service_type: req.body.service_type,
  })
  .then(dbServiceData => res.json(dbServiceData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;