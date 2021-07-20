const router = require('express').Router();
const { User, Post, Comment, Job, Service } = require('../../models');

//-----GET - FIND ALL POSTS-----//
router.get('/', (req, res) => {
  //Access User model and run .findAll() method
  Comment.findAll({
    order: [['created_at' , 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;