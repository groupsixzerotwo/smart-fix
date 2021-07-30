const { Job } = require('../models');

const jobData = [
  {
    job_title: 'Electrical problem',
    job_text: 'Fixing wiring in the room',
    job_address: '1111 ABC Ave, Toronto, ON, L5E',
    job_contact: '7977979999',
    user_id: 1,
    status_id: 1
  },
  {
    job_title: 'Broken door',
    job_text: 'Replacing the door',
    job_address: '222 ABC Ave, Toronto, ON, L5E',
    job_contact: '9997979999',
    user_id: 5,
    status_id: 1
  }
];

const seedJob = () => Job.bulkCreate(jobData);

module.exports = seedJob;