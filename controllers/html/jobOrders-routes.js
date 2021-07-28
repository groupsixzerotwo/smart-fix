const router = require('express').Router();
const sequelize = require('../../config/connection')
const { User, Service, Assignment, Job, Status, Rating } = require('../../models');

router.get('/', (req, res) => {
  const theuser = req.session.username;
  const isService = req.session.service_id;
  //const service = req.session.service_id;
  //----GET ASSIGNMENT AND JOB DATA FOR SERVICE PROVIDER----//
  if (req.session.service_id) {
    const dbAssignmentData = Assignment.findAll({
      where: {
        user_id: req.session.user_id
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
          attributes: ['id', 'job_title', 'job_text', 'created_at', 'updated_at'],
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
    });

    const dbJobData = Job.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Rating,
          attributes: ['id', 'points']
        },
        {
          model: Status
        }
      ]
    });

    Promise.all([dbAssignmentData, dbJobData])
      .then(([assignData, jData]) => {
      const assignmentData = assignData.map(assignment => assignment.get({plain: true}));
      const jobData = jData.map(assignment => assignment.get({plain: true}));
      console.log({assignmentData, jobData, theuser, loggedIn: req.session.loggedIn})
      res.render('jobOrdersSP', {assignmentData, jobData, theuser, loggedIn: req.session.loggedIn})
    });    
  } 
  //----GET JOB DATA FOR CUSTOMER----//
  else {
    const dbJobData = Job.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'job_title', 'job_text', 'created_at', 'updated_at'],
      include: [
        {
          model: Assignment,
          attributes: ['id']
        },
        {
          model: Status
        },
        {
          model: Rating,
          attributes: ['id', 'points']
        }
      ]
    });

    Promise.all([dbJobData])
      .then(([jData]) => {
      const jobData = jData.map(job => job.get({plain: true}));
      console.log(jobData);
      res.render('jobOrdersC', {jobData, theuser, loggedIn: req.session.loggedIn})
    });    
  }
});

router.get('/assignment/:id', (req, res) => {
  const theuser = req.session.username;
  const isService = req.session.service_id;
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
            attributes: ['id', 'username', 'email']
          }
        ]
      }
    ]
  })
  .then(dbAssignmentData => {
    if(!dbAssignmentData) {
      res.status(404).json({message: 'No service found with this id'});
      return;
    }
    const assignmentData = dbAssignmentData.get({plain: true});
    console.log({assignmentData, theuser, isService, loggedIn: req.session.loggedIn})
    res.render('single-assignment', {assignmentData, theuser, isService, loggedIn: req.session.loggedIn})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.get('/job/:id', (req, res) => {
  const theuser = req.session.username;
  const isService = req.session.service_id;
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
        attributes: ['id', 'username', 'email'],
      },
      {
        model: Assignment,
        include: {
          //User service provider
          model: User,
          attributes: ['id', 'username', 'email'],
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
    const jobData = dbJobData.get({plain: true});
    let applied = false;
    jobData.assignments.forEach(assignment => {
      if (assignment.user.id === req.session.user_id) {
        applied = true;
      }
    });
    console.log({jobData, theuser, isService, applied, loggedIn: req.session.loggedIn})
    res.render('single-job', {jobData, theuser, isService, applied, loggedIn: req.session.loggedIn})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;