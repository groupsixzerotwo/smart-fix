const router = require('express').Router();
const { User, Job, Service, Status, Rating, Assignment } = require('../../models');

//-----GET - FIND ALL JOBS-----//
router.get('/', (req, res) => {

  Job.findAll({
    include: [
      {
        model: Status
      },
      {
        model: User,
        //User customer
        attributes: ['id', 'username'],
      },
      {
        model: Rating,
        attributes: ['id', 'points']
      }
    ]
  })
  .then(dbJobData => res.json(dbJobData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE Job-----//
router.get('/:id', (req, res) => {

  Job.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Status
      },
      {
        model: User,
        //User customer
        attributes: ['id', 'username'],
      },
      {
        model: Assignment,
        include: {
          //User service provider
          model: User,
          attributes: ['id', 'username'],
          include: {
            model: Service
          }
        }
      },
      {
        model: Rating,
        attributes: ['id', 'points']
      }
    ]
  })
  .then(dbJobData => {
    if(!dbJobData) {
      res.status(404).json({message: 'No job found with this id'});
      return;
    }
    res.json(dbJobData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----POST - ADD A JOB-----//
router.post('/', (req,res) => {
  Job.create({
    job_title: req.body.job_title,
    job_text: req.body.job_text,
    job_address: req.body.job_address,
    job_contact: req.body.job_contact,
    job_media: req.body.job_media,
    status_id: req.body.status_id,
    user_id: req.session.user_id
  })
  .then(dbJobData => res.json(dbJobData))
  .catch(err => {
    console.log(err);
    if (err.errors[0].message === "Validation isNumeric on job_contact failed") {
      res.status(404).json({message: "Contact must be a number. No special character or alphabets allowed!"})
      return;
    }
    else {
      res.status(404).json({message: "Invalid input, please try again!"})
    }
  });
});

//-----PUT - UPDATE A JOB-----//
router.put('/:id', (req, res) => {
  Job.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbJobData => {
    if (!dbJobData) {
      res.status(404).json({message: 'No job found with that id'})
      return;
    }
    res.json(dbJobData);
  })
  .catch(err => {
    console.log(err);
    if (err.errors[0].message === "Validation isNumeric on job_contact failed") {
      res.status(404).json({message: "Contact must be a number. No special character or alphabets allowed!"})
      return;
    }
    else {
      res.status(404).json({message: "Invalid input, please try again!"})
    }
  });
});

//-----DELETE - DELETE JOB-----//
router.delete('/:id', (req, res) => {
  Job.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbJobData => {
    if (!dbJobData) {
      res.status(404).json({ message: 'No job found with this id' });
      return;
    }
    res.json(dbJobData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;