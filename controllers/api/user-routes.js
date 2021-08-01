const router = require('express').Router();
const { User, Post, Comment, Job, Service, Status, Rating } = require('../../models');
const withAuth = require('../../utils/auth');

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
    attributes: {exclude: ['password']},
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
        attributes: ['id', 'job_title', 'job_text', 'created_at'],
        include: {
          model: Status
        }
      },
      {
        model: Rating,
        attributes: ['id', 'points'],
        include: {
          model: Job,
          attributes: ['id', 'job_title', 'job_text']
        }
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
    service_id: req.body.service_id
  })
  .then(dbUserData => {
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.service_id = dbUserData.service_id;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    if (err.errors[0].message === "user.email must be unique") {
      res.status(404).json({message: "Email is already registered!"})
      return;
    }
    else if (err.errors[0].message === "Validation len on password failed") {
      res.status(404).json({message: "Password must be atleast 8 digits!"})
    }
    else {
      res.status(404).json({message: "Invalid input, please try again!"})
    }
  });
});

//-----POST - LOGIN USER-----//
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.service_id = dbUserData.service_id;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

//-----POST - LOGOUT USER-----//
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//-----PUT - UPDATE USER-----//
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({message: 'No user found with that id'})
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//-----DELETE - DELETE USER-----//
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;