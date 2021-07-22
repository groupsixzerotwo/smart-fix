const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Job = require('./Job');
const Service = require('./Service');

//Associations post and user
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//Associations user and service
User.belongsTo(Service, {
  foreignKey: 'service_id'
});

Service.hasMany(User, {
  foreignKey: 'service_id'
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

//Associations job and user
Job.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Job, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment, Job, Service };