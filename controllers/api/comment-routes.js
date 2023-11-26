const router = require('express').Router();
const { Comment } = require('../../models/index');
const withAuth = require('../../utils/auth');

// Route to get comments for a post
router.get('/:id', async (req, res) => {
  try {
    // Log the receipt of a get comments request
    const postId = req.params.id;

    // Retrieve all comments for the post
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
      },
      attributes: ['user_name', 'commentText'],
      raw: true,
    });

    // Respond with the comments
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new comment
router.post('/new', withAuth, async (req, res) => {
  try {
    // Log the receipt of a new comment request
    console.log('ADD NEW COMMENT REQUEST RECEIVED');

    // Retrieve user information from the session and comment details from the request body
    const { username, user_id } = req.session;
    const { commentText, postId } = req.body;

    // Create a new comment in the database
    const comment = await Comment.create({
      commentText: commentText,
      user_name: username,
      user_id: user_id,
      post_id: postId
    });

    // Indicate that the comments section should be initially visible
    const initialState = 'block';

    // Respond with a success message, the created comment, and the initial state
    res.status(200).json({ message: 'New comment posted!', comment, initialState });
  } catch (err) {
    // Log and respond with an error if there is an issue creating the comment
    console.error('Error posting new comment: ', err);
    res.status(500).json(err);
  }
});

// Route to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Log the receipt of a delete comment request
    console.log('DELETE COMMENT REQUEST RECEIVED');

    // Retrieve the comment ID from the request parameters
    const commentId = req.params.id;

    // Delete the comment from the database
    const comment = await Comment.destroy({
      where: {
        id: commentId,
      },
    });

    // Respond with a success message and the deleted comment
    res.status(200).json({ message: 'Comment deleted!', comment });
  } catch (err) {
    // Log and respond with an error if there is an issue deleting the comment
    console.error('Error deleting comment: ', err);
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
