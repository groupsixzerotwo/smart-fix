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

//-----POST - ADD A Job-----//
router.post('/', (req,res) => {
  Job.create({
    job_title: req.body.job_title,
    job_text: req.body.job_text,
    job_address: req.body.job_address,
    job_contact: req.body.job_contact,
    job_media: req.body.job_media,
    status_id: req.body.status_id,
    user_id: req.body.user_id
  })
  .then(dbJobData => res.json(dbJobData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;