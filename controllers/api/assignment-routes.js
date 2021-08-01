const router = require('express').Router();
const { User, Job, Service, Status, Rating, Assignment } = require('../../models');
const withAuth = require('../../utils/auth');

//-----GET - FIND ALL ASSIGNMENT-----//
router.get('/', withAuth, (req, res) => {
  //Access assignment model and run .findAll() method
  Assignment.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
        include: {
          model: Service
        }
      },
      {
        model: Job,
        attributes: ['id', 'job_title'],
        include: [
          {
            model: Status
          },
          {
            model: Rating,
            attributes: ['id', 'points']
          }
        ]
      }
    ]
  })
  .then(dbAssignmentData => res.json(dbAssignmentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE ASSIGNMENT-----//
router.get('/:id', withAuth, (req, res) => {
  //Access assignment model and run .findAll() method
  Assignment.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
        include: {
          model: Service
        }
      },
      {
        model: Job,
        attributes: ['id', 'job_title'],
        include: [
          {
            model: Status
          },
          {
            model: Rating,
            attributes: ['id', 'points']
          },
          {
            model: User,
            attributes: ['id', 'username']
          }
        ]
      }
    ]
  })
  .then(dbAssignmentData => {
    if(!dbAssignmentData) {
      res.status(404).json({message: 'No assignment found with this id'});
      return;
    }
    res.json(dbAssignmentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----POST - FIND ONE ASSIGNMENT WITH ORDER NUMBER-----//
router.post('/orderNum', withAuth, (req, res) => {
  Assignment.findOne({
    where: {
      order_number: req.body.order_number
    }
  })
  .then(dbAssignmentData => {
    if(!dbAssignmentData) {
      res.status(404).json({message: 'No assignment found with this order number'});
      return;
    }
    console.log(dbAssignmentData)
    res.json(dbAssignmentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.post('/delete', withAuth, (req, res) => {
  Assignment.destroy({
    where: {
      order_number: req.body.order_number
    }
  })
  .then(dbAssignmentData => {
    if (!dbAssignmentData) {
      res.status(404).json({ message: 'No assignment found with this order number' });
      return;
    }
    res.json(dbAssignmentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----POST - ADD AN ASSIGNMENT-----//
router.post('/', withAuth, (req,res) => {
  Assignment.create({
    cost: req.body.cost,
    order_number: req.body.order_number,
    start_date: req.body.start_date,
    complete_date: req.body.complete_date,
    job_id: req.body.job_id,
    //user_id: req.body.user_id
    user_id: req.session.user_id
  })
  .then(dbAssignmentData => res.json(dbAssignmentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----PUT - UPDATE A JOB-----//
router.put('/:id', withAuth, (req, res) => {
  Assignment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbAssignmentData => {
    if (!dbAssignmentData) {
      res.status(404).json({message: 'No assignment found with that id'})
      return;
    }
    res.json(dbAssignmentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----DELETE - DELETE JOB-----//
router.delete('/:id', withAuth, (req, res) => {
  Assignment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbAssignmentData => {
    if (!dbAssignmentData) {
      res.status(404).json({ message: 'No assignment found with this id' });
      return;
    }
    res.json(dbAssignmentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;