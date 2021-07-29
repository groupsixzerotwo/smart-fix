const { Assignment } = require('../models');

const assignmentData = [
];

const seedAssignment = () => Assignment.bulkCreate(assignmentData);

module.exports = seedAssignment;