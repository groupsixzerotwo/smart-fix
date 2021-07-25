const { Assignment } = require('../models');

const assignmentData = [
  {
    cost: "250",
    order_number: "FIX00002",
    start_date: "14 July",
    complete_date: "22 July",
    job_id: 2,
    user_id: 2
  }
];

const seedAssignment = () => Assignment.bulkCreate(assignmentData);

module.exports = seedAssignment;