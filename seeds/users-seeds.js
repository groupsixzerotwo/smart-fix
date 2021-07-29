const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    email: 'user1@gmail.com',
    password: 'password'
  },
  {
    username: 'user2',
    email: 'user2@gmail.com',
    password: 'password',
    service_id: 1
  },
  {
    username: 'user3',
    email: 'user3@gmail.com',
    password: 'password',
    service_id: 2
  },
  {
    username: 'user4',
    email: 'user4@gmail.com',
    password: 'password',
    service_id: 3
  },
  {
    username: 'user5',
    email: 'user5@gmail.com',
    password: 'password'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;