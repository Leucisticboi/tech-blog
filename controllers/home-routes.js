const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ 
      order: [['createdAt', 'DESC']],
      raw: true 
    });

    return res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('login', {
    title: 'Login'
  });
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }

  return res.render('signup', {
    title: 'Sign Up'
  });
});

router.get('/newpost', withAuth, (req, res) => {
  return res.render('new-post', {
    title: 'New Post',
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
});

router.get('/profile/:id', withAuth, async (req, res) => {
  const userId = req.params.id;

  const profileUser = await User.findByPk(userId);
  const profileUsername = profileUser.username;

  const posts = await Post.findAll({
    where: {
      user_name: profileUsername
    }
  }) || [];

  const comments = await Comment.findAll({
    where: {
      user_name: profileUsername
    },
    include: [
      {
        model: Post,
        attributes: ['postTitle'],
        as: 'post',
      },
    ],
  }) || [];

  return res.render('profile', {
    title: `${userId}`,
    posts,
    comments,
    profileOwner: profileUsername,
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
});

// Route to retrieve a single post and its comments
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    console.log('SINGLE POST GET REQUEST RECEIVED');

    // Find the post by its primary key
    const post = await Post.findByPk(req.params.id);

    // Find all comments associated with the post
    const comments = await Comment.findAll({ where: { post_id: req.params.id } });

    console.log('Post', post);
    console.log('Comments', comments);

    // Check if the post exists
    if (!post) {
      return console.log('Something went wrong. Please try again.');
    }

    // Render the full-post view with post and comments data
    res.render('full-post', {
      post,
      comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    // Respond with an error status and details if an issue occurs
    res.status(500).json(err);
  }
});


// Route to render the edit-post view for a specific post
router.get('/blog/edit/:id', withAuth, async (req, res) => {
  try {
    console.log('EDIT GET REQUEST RECEIVED');

    // Find the post by its primary key
    const post = await Post.findByPk(req.params.id);

    console.log('Post:', post);

    // Check if the post exists
    if (!post) {
      console.log('Post not found. Please check the ID.');
      return res.status(404).send('Post not found');
    }

    // Render the edit-post view with post data
    res.render('edit-post', {
      post,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    // Respond with an error status and details if an issue occurs
    console.error('Error: ', err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/dashboard/:username', withAuth, async (req, res) => {
  try {
    const username = req.params.username;

    const posts = await Post.findAll({
      where: {
        user_name: username
      }
    }) || [];

    const comments = await Comment.findAll({
      where: {
        user_name: username
      },
      include: [
        {
          model: Post,
          attributes: ['postTitle'],
          as: 'post',
        },
      ],
    }) || [];

    console.log(comments);

    res.render('dashboard', {
      posts,
      comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;