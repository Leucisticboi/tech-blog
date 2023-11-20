const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    console.log('SINGLE POST GET REQUEST RECEIVED');
    const post = await Post.findByPk(req.params.id);
    const comments = await Comment.findAll({ where: { postId: req.params.id } });
    console.log('Post', post);
    console.log('Comments', comments);

    if (!post) {
      return console.log('Something went wrong. Please try again.');
    }



    res.render('full-post', {
      post,
      comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    console.log('EDIT GET REQUEST RECEIVED');
    const post = await Post.findByPk(req.params.id);
    console.log('Post:', post);

    if (!post) {
      console.log('Post not found. Please check the ID.');
      return res.status(404).send('Post not found');
    }

    res.render('edit-post', {
      post,
    });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    console.log('EDIT PUT REQUEST RECEIVED');

    const { title, body } = req.body;

    console.log('Title:', title, 'Body:', body);

    const post = await Post.findByPk(req.params.id);

    if (!post) {
      console.log('Post not found. Please check the ID.');
      return res.status(404).send('Post not found');
    }

    console.log('Post found:', post);

    const updatedPost = await post.update({
      postTitle: title,
      postText: body
    });

    console.log('Post updated:', updatedPost);

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error during edit:', err);
    res.status(500).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('DELETE POST REQUEST RECEIVED');

    const post = await Post.findByPk(req.params.id);

    if (!post) {
      console.log('Post not found. Please check the ID.');
      return res.status(404).send('Post not found');
    }

    console.log('Post found:', post);

    const deletedRows = await post.destroy();

    if (deletedRows) {
      console.log('Post deleted successfully.');
      res.status(200).json({ message: 'Post deleted' });
    } else {
      console.log('Post not deleted. No matching record found.');
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.error('Error during delete:', err);
    res.status(500).json(err);
  }
});

module.exports = router;