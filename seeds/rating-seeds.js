const { Rating } = require('../models');

const assignmentData = [
  {
    points: "5",
    job_id: 2,
    user_id: 4
  }
];

const seedRating = () => Rating.bulkCreate(assignmentData);

module.exports = seedRating;