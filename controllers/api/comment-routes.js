const router = require('express').Router();
const { User, Post, Comment, Job, Service } = require('../../models');

//-----GET - FIND ALL COMMENTS-----//
router.get('/', (req, res) => {
  //Find all comments
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

//-----GET - FIND ONE COMMENT-----//
router.get('/:id', (req, res) => {
  //Find a comment
  Comment.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbCommentData => {
    if(!dbCommentData) {
      res.status(404).json({message: 'No comment found with this id'});
      return;
    }
    res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----POST - ADD A COMMENT-----//
router.post('/', (req,res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

//-----PUT - UPDATE A COMMENT-----//
router.put('/:id', (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({message: 'No comment found with that id'})
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----DELETE - DELETE A COMMENT-----//
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;