const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.findAll({
      where: {
        post_id: postId,
      },
      attributes: ['user_name', 'commentText'],
      raw: true,
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new comment
router.post('/new', async (req, res) => {
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


// Route to edit an existing comment
router.put('/edit/:id', async (req, res) => {
  try {
    // Log the receipt of an edit comment request
    console.log('EDIT COMMENT REQUEST RECEIVED');

    // Retrieve the edited comment text from the request body
    const { newComment } = req.body;

    // Find the comment in the database by its ID
    const comment = await Comment.findByPk(req.params.id);

    // Check if the comment exists
    if (!comment) {
      // Log and respond with a 404 status if the comment is not found
      console.log('Comment not found. Please check the ID.');
      return res.status(404).send('Comment not found.');
    }

    // Update the comment with the new text
    const updatedComment = await comment.update({
      commentText: newComment
    });

    // Log and respond with a success message and the updated comment
    console.log('Comment updated: ', updatedComment);
    res.status(200).json(updatedComment);
  } catch (err) {
    // Log and respond with an error if there is an issue updating the comment
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to delete an existing comment
router.delete('/delete/:id', async (req, res) => {
  try {
    // Log the receipt of a delete comment request
    console.log('DELETE COMMENT REQUEST RECEIVED');

    // Find the comment in the database by its ID
    const comment = await Comment.findByPk(req.params.id);

    // Check if the comment exists
    if (!comment) {
      // Respond with a 404 status and message if the comment is not found
      return res.status(404).json({ message: 'No comment with that ID' });
    }

    // Delete the comment from the database
    const deletedComment = await comment.destroy();

    // Check if the deletion was successful
    if (deletedComment) {
      // Log and respond with a success message if the comment is deleted
      console.log('Comment deleted successfully.');
      res.status(200).json({ message: 'Comment deleted' });
    } else {
      // Log and respond with a 404 status and message if the comment is not deleted
      console.log('Comment not deleted.');
      res.status(404).json({ message: 'Something went wrong deleting this comment.' });
    }
  } catch (err) {
    // Log and respond with an error if there is an issue deleting the comment
    console.error(err);
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;