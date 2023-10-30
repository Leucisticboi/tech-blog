const router = require('express').Router();
const { User } = require('../../models');

// New User
router.post('/signup', async (req, res) => {
    try {
        console.log('Request received')
        if(req.body.password !== req.body.confirmPassword) {
            res.status(400).json({ message: 'Passwords do not match' });
            return;
        }

        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.username;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('Reqeuest received')
        const userData = await User.findOne({ where: { username: req.body.username } });

        if(!userData) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.username;

            res.json({ user: userData, message: 'Logged in'});
        });

        res.render('/');

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log('logged out');
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;