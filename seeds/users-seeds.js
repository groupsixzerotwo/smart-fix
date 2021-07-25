const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@gmail.com',
    password: 'password1'
  },
  {
    username: 'user2',
    email: 'user2@gmail.com',
    password: 'password2',
    service_id: 1
  },
  {
    username: 'user3',
    email: 'user3@gmail.com',
    password: 'password3',
    service_id: 2
  },
  {
    username: 'user4',
    email: 'user4@gmail.com',
    password: 'password4',
    service_id: 3
  },
  {
    username: 'user5',
    email: 'user5@gmail.com',
    password: 'password5'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;