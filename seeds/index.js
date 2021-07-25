const seedUsers = require('./users-seeds');
const seedService = require('./service-seeds');
const seedPost = require('./post-seeds');
const seedComment = require('./comment-seeds');
const seedStatus = require('./status-seeds');
const seedJob = require('./job-seeds');
const seedAssignment = require('./assignment-seeds');
const seedRating = require('./rating-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({force: true});
  console.log('\n----DATABASE SYNCED----\n');
  await seedService();
  console.log('\n----SERVICE SYNCED----\n');
  await seedUsers();
  console.log('\n----USERS SYNCED----\n');
  await seedPost();
  console.log('\n----POSTS SYNCED----\n');
  await seedComment();
  console.log('\n----POSTS SYNCED----\n');
  await seedStatus();
  console.log('\n----STATUS SYNCED----\n');
  await seedJob();
  console.log('\n----JOB SYNCED----\n');
  await seedAssignment();
  console.log('\n----ASSIGNMENT SYNCED----\n');
  await seedRating();
  console.log('\n----RATING SYNCED----\n');

  process.exit(0);
};

seedAll();