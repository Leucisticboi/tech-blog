// Import required models
const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
});

// Export models
module.exports = { User, Post, Comment };