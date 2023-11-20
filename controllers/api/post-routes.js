const router = require('express').Router();
const { Post } = require('../../models');

router.post('/new', async (req, res) => {
  try {
    console.log('NEW POST REQUEST RECEIVED');

    const { postTitle, postBody } = req.body;
    const { username, user_id } = req.session;

    const newPost = await Post.create({
      postTitle: postTitle,
      postText: postBody,
      user_name: username,
      user_id: user_id
    });

    return res.status(200).json(newPost.id);
  } catch (err) {
    console.error('Error creating new post:', err);
    res.status(500).json(err);
  }
});

// Route to handle the update of a specific post
router.put('/edit/:id', async (req, res) => {
  try {
    console.log('EDIT PUT REQUEST RECEIVED');

    // Extract title and body from the request body
    const { title, body } = req.body;

    console.log('Title:', title, 'Body:', body);

    // Find the post by its primary key
    const post = await Post.findByPk(req.params.id);

    // Check if the post exists
    if (!post) {
      console.log('Post not found. Please check the ID.');
      return res.status(404).send('Post not found');
    }

    console.log('Post found:', post);

    // Update the post with the new title and body
    const updatedPost = await post.update({
      postTitle: title,
      postText: body
    });

    console.log('Post updated:', updatedPost);

    // Respond with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Respond with an error status and details if an issue occurs
    console.error('Error during edit:', err);
    res.status(500).json(err);
  }
});

// Route to handle the deletion of a specific post
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('DELETE POST REQUEST RECEIVED');

    // Find the post by its primary key
    const post = await Post.findByPk(req.params.id);

    // Check if the post exists
    if (!post) {
      console.log('Post not found. Please check the ID.');
      return res.status(404).send('Post not found');
    }

    console.log('Post found:', post);

    // Destroy the post and get the number of deleted rows
    const deletedRows = await post.destroy();

    // Check if the post was successfully deleted
    if (deletedRows) {
      console.log('Post deleted successfully.');
      res.status(200).json({ message: 'Post deleted' });
    } else {
      console.log('Post not deleted. No matching record found.');
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    // Respond with an error status and details if an issue occurs
    console.error('Error during delete:', err);
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
