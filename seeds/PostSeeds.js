const { Post } = require('../models');

const postData = [
  {
    postTitle: "Example Post 1",
    postText: "This is the first example of what a post's body would look like.",
    userId: "1",
  },
  {
    postTitle: "Example Post 2",
    postText: "This is the second example of what a post's body would look like. It's different!",
    userId: "2",
  },
  {
    postTitle: "Example Post 3",
    postText: "This is the third example of what a post's body would look like. It's slightly different with some similarities.",
    userId: "3",
  },
  {
    postTitle: "Example Post 4",
    postText: "This is the fourth example of what a post's body would look like. It's got a whole new second sentence, v different from the rest okie?",
    userId: "2",
  },
  {
    postTitle: "Example Post 5",
    postText: "This is the fifth and last example of what a post's body would look like. It's not actually all that different from the rest but oh well..",
    userId: "1",
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;