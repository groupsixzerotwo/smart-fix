const router = require('express').Router();
const sequelize = require('../../config/connection')
const { User, Service, Assignment, Job, Status, Rating } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  const theuser = req.session.username;
  const isService = req.session.service_id;
  //const service = req.session.service_id;
  //----GET ASSIGNMENT AND JOB DATA FOR SERVICE PROVIDER----//
  if (req.session.service_id) {
    //get all assignment data for the user
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

    //get all jobs data
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
        },
        {
          model: Assignment,
          include: {
            model: User,
            attributes: ['id', 'username']
          }
        }
      ]
    });

    //Execute both promises together
    Promise.all([dbAssignmentData, dbJobData])
      .then(([assignData, jData]) => {
        let jobData = [];

        const assignmentData = assignData.map(assignment => assignment.get({plain: true}));
        //Seperate jobs applied with the ones not applied
        jData.forEach(job => {         
          let eachjob = job.get({plain: true});
          let addJob = true;
          eachjob.assignments.forEach(assignment => {
            //if user id in the job's assignment matches the one in session
            if (assignment.user.id === req.session.user_id) {
              addJob = false;
            }
          });
          if (addJob) {
            jobData.push(eachjob);
          }
        });

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

      res.render('jobOrdersC', {jobData, theuser, loggedIn: req.session.loggedIn})
    });    
  }
});

//----GET ONE JOB WITH ID----//
router.get('/job/:id', withAuth, (req, res) => {
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
    //job data
    const jobData = dbJobData.get({plain: true});
    //check if user in session has applied for the job
    let applied = false;
    //check if the job application is approved
    let approval = false;
    //Filter application for user in session
    let yourApplication = {};
    //Forms paragraphs for job description
    const temp = jobData.job_text.split("\n");
    jobData.job_text = temp;

    jobData.assignments.forEach(assignment => {
      console.log(assignment)
      if (assignment.approved_status) {
        approval = true;
      };
      if (assignment.user.id === req.session.user_id) {
        applied = true;
        yourApplication = assignment;
      };
    });

    res.render('single-job', {jobData, theuser, isService, applied, approval, yourApplication, loggedIn: req.session.loggedIn})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;