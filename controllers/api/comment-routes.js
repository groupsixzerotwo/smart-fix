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

router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});


module.exports = router;