const router = require('express').Router();
const { User, Job, Service, Status, Rating, Assignment } = require('../../models');

//-----GET - FIND ALL ASSIGNMENT-----//
router.get('/', (req, res) => {
  //Access Service model and run .findAll() method
  Rating.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
      {
        model: Job,
        attributes: ['id', 'job_title'],
      }
    ]
  })
  .then(dbRatingData => res.json(dbRatingData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE ASSIGNMENT-----//
router.get('/:id', (req, res) => {
  //Access Service model and run .findAll() method
  Rating.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
      },
      {
        model: Job,
        attributes: ['id', 'job_title'],
        include: [
          {
            model: Status
          },
          {
            model: Assignment,
            attributes: ['id', 'cost', 'order_number', 'start_date', 'complete_date'],
            include: {
              model: User,
              attributes: ['id', 'username']
            }
          }
        ]
      }
    ]
  })
  .then(dbRatingData => {
    if(!dbRatingData) {
      res.status(404).json({message: 'No service found with this id'});
      return;
    }
    res.json(dbRatingData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----POST - ADD AN ASSIGNMENT-----//
router.post('/', (req,res) => {
  Rating.create({
    points: req.body.points,
    user_id: req.body.user_id,
    job_id: req.body.job_id
  })
  .then(dbRatingData => res.json(dbRatingData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----PUT - UPDATE A JOB-----//
router.put('/:id', (req, res) => {
  Rating.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbRatingData => {
    if (!dbRatingData) {
      res.status(404).json({message: 'No job found with that id'})
      return;
    }
    res.json(dbRatingData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----DELETE - DELETE JOB-----//
router.delete('/:id', (req, res) => {
  Rating.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbRatingData => {
    if (!dbRatingData) {
      res.status(404).json({ message: 'No job found with this id' });
      return;
    }
    res.json(dbRatingData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;