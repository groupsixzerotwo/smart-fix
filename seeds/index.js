const seedUsers = require('./users-seeds');
const seedService = require('./service-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({force: true});
  console.log('1')
  console.log('\n----DATABASE SYNCED----\n');
  await seedService();
  console.log('2')
  console.log('\n----SERVICE SYNCED----\n');
  await seedUsers();
  console.log('3')
  console.log('\n----USERS SYNCED----\n');

  process.exit(0);
};

seedAll();