const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Job = require('./Job');
const Skill = require('./Skill');
const { STRING } = require('sequelize/types');

//Associations post and user
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//Associations user and skill
User.belongs(Skill, {
  foreignKey: 'skill_id'
});

Skill.hasMany(User, {
  foreignKey: 'skill_id'
})

//Associations comments, post and user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

//Associations job, post and user
Job.belongsTo(User, {
  foreignKey: 'user_id'
});

Job.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Job, {
  foreignKey: 'user_id'
});

Post.hasMany(Job, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };