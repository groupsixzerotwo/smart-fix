const { Comment } = require('../models');

const postData = [
  {
    comment_text: 'Us it just one socket or are there any other issues?',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'No just one socket is having issues',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Is the compressor turning on?',
    user_id: 4,
    post_id: 2
  },
  {
    comment_text: 'Did you try ...................',
    user_id: 3,
    post_id: 1
  },
  {
    comment_text: 'Yes tried everything, still nothing',
    user_id: 1,
    post_id: 1
  },
];

const seedComment = () => Comment.bulkCreate(postData);

module.exports = seedComment;