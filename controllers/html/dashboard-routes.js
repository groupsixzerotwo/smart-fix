const router = require('express').Router();
const sequelize = require('../../config/connection')
const { Service, Assignment } = require('../../models');

router.get('/', (req, res) => {
  const theuser = req.session.username;
  const service = req.session.service_id;
  if (req.session.service_id) {
    Assignment.findAll({
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
      const assignmentData = dbAssignmentData.map(assignment => assignment.get({plain: true}));
      console.log(assignmentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  }
  res.render('dashboard', {theuser, service, loggedIn: req.session.loggedIn})
})

module.exports = router;