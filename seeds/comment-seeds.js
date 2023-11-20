const { Comment } = require('../models/index.js');

const commentData = [
  {
    commentText: "This is example comment number 1 on post 1. It's not all that special.",
    use_id: "1",
    user_name: "example1",
    post_id: "1",
  },
  {
    commentText: "This is example comment number 2 on post 1. It's a little special.",
    use_id: "3",
    user_name: "example3",
    post_id: "1",
  },
  {
    commentText: "This is example comment number 1 on post 2. It's not all that special.",
    user_id: "3",
    user_name: "example3",
    post_id: "2",
  },
  {
    commentText: "This is example comment number 2 on post 2. It's not all that special.",
    use_id: "1",
    user_name: "example1",
    post_id: "2"
  },
  {
    commentText: "This is example comment number 1 on post 4. It's not all that special.",
    use_id: "2",
    user_name: "example2",
    post_id: "4",
  },
  {
    commentText: "This is example comment number 1 on post 3. It's not all that special.",
    use_id: "1",
    user_name: "example1",
    post_id: "3",
  },
  {
    commentText: "This is example comment number 1 on post 5. It's not all that special.",
    use_id: "3",
    user_name: "example3",
    post_id: "5",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;