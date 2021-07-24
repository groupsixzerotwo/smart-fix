const router = require('express').Router();
const { Status } = require('../../models');

//-----GET - FIND ALL STATUS-----//
router.get('/', (req, res) => {
  Status.findAll({})
  .then(dbStatusData => res.json(dbStatusData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE STATUS-----//
router.get('/:id', (req, res) => {
  Status.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbStatusData => {
    if(!dbStatusData) {
      res.status(404).json({message: 'No status found with this id'});
      return;
    }
    res.json(dbStatusData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----POST - ADD A STATUS-----//
router.post('/', (req,res) => {
  Status.create({
    status_text: req.body.status_text
  })
  .then(dbStatusData => res.json(dbStatusData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;