const { Post } = require('../models');

const postData = [
  {
    title: 'Electrical problem',
    post_text: 'No power in the kitchen socket',
    user_id: 1
  },
  {
    title: 'Air conditioning not cooling',
    post_text: 'I have cooling issue with my air conditioning unit. No cooling even at the lowest temperature',
    user_id: 5
  },
  {
    title: 'Door broken',
    post_text: 'I have problem with my door, its not closing properly and I am unable to lock it.',
    user_id: 3
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;