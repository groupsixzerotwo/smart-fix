const router = require('express').Router();
const { User, Post, Comment, Service } = require('../../models');
const sequelize = require('../../config/connection');

//-----GET - FIND ALL POSTS-----//
router.get('/', (req, res) => {
  //Access Post model and run .findAll() method
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
    ],
    order: [['created_at' , 'DESC']],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
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
  //Access Post model and find One
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'post_text', 'post_media', 'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
        include: {
          model: Service,
          attributes: ['service_type']
        }
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['id', 'username'],
          include: {
            model: Service,
            attributes: ['service_type']
          }
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

//-----POST - ADD A NEW POST-----//
router.post('/', (req, res) => {
  // 
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    post_media: req.body.post_media,
    user_id: req.body.user_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----PUT - UPDATE A POST-----//
router.put('/:id', (req, res) => {
  Post.update(req.body, {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----DELETE - DELETE A POST-----//
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;