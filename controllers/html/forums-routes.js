const router = require('express').Router();
const sequelize = require('../../config/connection')
const { Post, User, Comment, Service } = require('../../models');

//-----FORUMS LANDING PAGE-----//
router.get('/', (req, res) => {
  //Get all posts
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text'],
      },
      {
        model: User,
        attributes: ['username']
      }
    ],
    order: [
      ['updated_at', 'DESC']
    ]
  })
  .then(dbPostData => {
    const postsData = dbPostData.map(post => post.get({ plain: true }));
    const posts = postsData.map(post => {
      let temp = post.post_text.split("\n");
      post.post_text = []
      post.post_text.push(temp[0].split(" ").splice(0, 30).join(" "));
      return post;
    });
    res.render('forums', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;