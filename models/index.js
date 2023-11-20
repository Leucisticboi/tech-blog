const { User } = import('./user.js');
const { Post } = import('./post.js');
const { Comment } = import('./comment.js');

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

module.exports = User, Post, Comment;