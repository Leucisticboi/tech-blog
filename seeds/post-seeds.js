const { Post } = require('../models/index.js');

const postData = [
  {
    postTitle: "Example Post 1",
    postText: "This is the first example of what a post's body would look like.",
    user_id: "1",
    user_name: "example1"
  },
  {
    postTitle: "Example Post 2",
    postText: "This is the second example of what a post's body would look like. It's different!",
    user_id: "2",
    user_name: "example2"
  },
  {
    postTitle: "Example Post 3",
    postText: "This is the third example of what a post's body would look like. It's slightly different with some similar_ities.",
    user_id: "3",
    user_name: "example3"
  },
  {
    postTitle: "Example Post 4",
    postText: "This is the fourth example of what a post's body would look like. It's got a whole new second sentence, v different from the rest okie?",
    user_id: "2",
    user_name: "example2"
  },
  {
    postTitle: "Example Post 5",
    postText: "This is the fifth and last example of what a post's body would look like. It's not actually all that different from the rest but oh well..",
    user_id: "1",
    user_name: "example1"
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;