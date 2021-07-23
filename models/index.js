const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Job = require('./Job');
const Service = require('./Service');
const Status = require('./Status');
const Assignment = require('./Assignment');
const Rating = require('./Rating');

//Associations between post and user
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

//Associations between user and service
User.belongsTo(Service, {
  foreignKey: 'service_id'
});

Service.hasMany(User, {
  foreignKey: 'service_id'
})

//Associations between comments, post and user
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

//Associations between job and user (customer)
Job.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Job, {
  foreignKey: 'user_id'
});

//Associations between job and status
Job.belongsTo(Status, {
  foreignKey: 'status_id'
});

Status.hasMany(Job, {
  foreignKey: 'status_id'
});

//Associations between job, assignment and user(service provider)
Job.hasOne(Assignment, {
  foreignKey: 'job_id'
});

Assignment.belongsTo(Job, {
  foreignKey: 'job_id'
});

Assignment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Assignment, {
  foreignKey: 'user_id'
});

//Associations between job, rating and user(customer)
Rating.belongsTo(Job, {
  foreignKey: 'job_id'
});

Job.hasOne(Rating, {
  foreignKey: 'job_id'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment, Job, Service, Status, Assignment,Rating };