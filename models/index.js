const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'username',
});

User.hasMany(Comment, {
  foreignKey: 'username',
});

Post.belongsTo(User, {
  foreignKey: 'username',
});

Comment.belongsTo(User, {
  foreignKey: 'username',
});

module.exports = { User, Post, Comment };
