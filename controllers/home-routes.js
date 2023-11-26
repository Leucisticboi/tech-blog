const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    // Find all posts, ordered by their creation date
    const posts = await Post.findAll({ 
      order: [['createdAt', 'DESC']],
      raw: true 
    });

    // Render the homepage with the posts data
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

// Route to render the login page
router.get('/login', (req, res) => {
  // Check if a user is logged in
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  return res.render('login', {
    title: 'Login'
  });
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // Check if a user is logged in
  if (req.session.loggedIn) {
    return res.redirect('/');
  }

  // Render the signup page if the user is not logged in
  return res.render('signup', {
    title: 'Sign Up'
  });
});

// Route to render the new post page
router.get('/newpost', withAuth, (req, res) => {
  // Render the 
  return res.render('new-post', {
    title: 'New Post',
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
});

// Route to render the profile page for a specific user
router.get('/profile/:id', withAuth, async (req, res) => {
  // Find the user by its primary key
  const profileUser = await User.findByPk(req.params.id);
  const profileUsername = profileUser.username;

  // Find all posts by the user of the ID
  const posts = await Post.findAll({
    where: {
      user_name: profileUsername
    },
    order: [['createdAt', 'DESC']],
    raw: true
  }) || [];

  // Find all comments by the user of the same ID
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

  // Render profile page with posts and comments data
  return res.render('profile', {
    title: `${profileUsername}`,
    posts,
    comments,
    profileOwner: profileUsername,
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
});

// Route to retrieve a single post and its comments
router.get('/blog/:id', async (req, res) => {
  try {
    console.log('SINGLE POST GET REQUEST RECEIVED');

    // Find the post by its primary key
    const post = await Post.findByPk(req.params.id);

    // Find all comments associated with the post
    const comments = await Comment.findAll({ where: { post_id: req.params.id } });

    // Check if the post exists
    if (!post) {
      return console.log('Something went wrong. Please try again.');
    }

    // Replace the newline characters with HTML line breaks in postText
    post.dataValues.postText = post.dataValues.postText.replace(/\r?\n/g, '<br />');

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

// Route to render the edit-comment view for a specific comment
router.get('/dashboard/:username', withAuth, async (req, res) => {
  try {
    // Find the user by its primary key
    const username = req.session.username;

    // Find all posts by the user of that ID
    const posts = await Post.findAll({
      where: {
        user_name: username
      }
    }) || [];

    // Find all comments by the user of the same ID
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

    // Render the dashboard view with posts and comments data
    res.render('dashboard', {
      posts,
      comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    // Respond with an error status and details if an issue occurs
    console.error(err);
    return res.status(500).json(err);
  }
});

// Export the router functions
module.exports = router;