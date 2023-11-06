const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
      if(req.body.password !== req.body.confirmPassword) {
        return res
          .status(400)
          .json({ message: 'Confirmed password did not match password.'});
      }

      const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      const newUser = userData.get({ plain: true });

      req.session.save(() => {
          req.session.loggedIn = true;
          req.session.username = newUser.username;
          req.session.user_id = newUser.id;

          res.status(200).json(userData);
      });
  } catch (err) {
      res.status(400).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('hit /api/users/login');
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { 
          username: username
          } 
    });

    if(!user) {
      return res
        .status(400)
        .json({ message: 'Username does not exist'});
    }

    const validPassword = await user.checkPassword(password);

    if(!validPassword) {
      return res
          .status(400)
          .json({ message: 'Incorrect password'});
    }

    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = { username };
        console.log(req.session);
    });

    res
      .status(200)
        .json({ 
          user: user, 
          loggedIn: req.session.loggedIn, 
          message: 'Login successful' 
        });

  } catch (err) {
      console.log(err);
      res.status(400).json(err);
  }
});

module.exports = router;
