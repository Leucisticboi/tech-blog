const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ raw: true });

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

module.exports = router;