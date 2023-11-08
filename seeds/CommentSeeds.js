const { Comment } = require('../models');

const commentData = [
  {
    commentText: "This is example comment number 1. It's not all that special.",
    userId: "1",
    postId: "1",
  },
  {
    commentText: "This is example comment number 2. It's a little special.",
    userId: "3",
    postId: "1",
  },
  {
    commentText: "This is example comment number 1. It's not all that special.",
    userId: "3",
    postId: "2",
  },
  {
    commentText: "This is example comment number 1. It's not all that special.",
    userId: "1",
    postId: "2"
  },
  {
    commentText: "This is example comment number 1. It's not all that special.",
    userId: "2",
    postId: "4",
  },
  {
    commentText: "This is example comment number 1. It's not all that special.",
    userId: "1",
    postId: "3",
  },
  {
    commentText: "This is example comment number 1. It's not all that special.",
    userId: "3",
    postId: "5",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;