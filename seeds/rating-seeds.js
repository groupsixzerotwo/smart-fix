const { Rating } = require('../models');

const assignmentData = [
];

const seedRating = () => Rating.bulkCreate(assignmentData);

module.exports = seedRating;