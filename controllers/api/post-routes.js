const router = require('express').Router();
const { User, Post, Comment, Job, Service } = require('../../models');
const sequelize = require('../../config/connection');

//-----GET - FIND ALL POSTS-----//
router.get('/', (req, res) => {
  //Access User model and run .findAll() method
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
    ],
    order: [['created_at' , 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----GET - FIND ONE POST-----//
router.get('/:id', (req, res) => {
  //Access User model and run .findAll() method
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'post_text', 'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/upvote', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;