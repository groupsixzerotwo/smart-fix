const router = require('express').Router();
const sequelize = require('../../config/connection')
const { User, Service, Assignment, Job, Status, Rating } = require('../../models');

router.get('/', (req, res) => {
  const theuser = req.session.username;
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
      console.log(assignmentData, jobData);
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
      const jobData = jData.map(assignment => assignment.get({plain: true}));
      console.log(jobData);
      res.render('jobOrdersC', {jobData, theuser, loggedIn: req.session.loggedIn})
    });    
  }
})

module.exports = router;