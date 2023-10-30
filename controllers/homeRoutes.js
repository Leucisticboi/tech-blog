const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const lastFivePosts = await Post.findAll({
            order: [['updatedAt', 'DESC']],
            limit: 5,
        });

        res.render('homepage', { posts: lastFivePosts });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.error(error);
        res.status(400).send('Could not log in');
    }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.error(error);
        res.status(400).send('Could not log in');
    }
});

module.exports = router;
