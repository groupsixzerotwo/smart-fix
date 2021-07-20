const router = require('express').Router();
const { User, Post, Comment, Job, Service } = require('../../models');

//-----GET - FIND ALL USERS-----//
router.get('/', (req, res) => {
  //Access User model and run .findAll() method
  User.findAll({
    //attributes: {exclude: ['password']}
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE USER-----//
router.get('/:id', (req,res) => {
  User.findOne({
    //attributes: {exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Service
      },
      {
        model: Post,
        attributes: ['id', 'title', 'post_text', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at']
      },
      {
        model: Job,
        attributes: ['id', 'job_text', 'price_bid','created_at']
      }
    ]
  })
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----POST - ADD A USER-----//
router.post('/', (req,res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    skill_id: req.body.skill_id
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
})

module.exports = router;