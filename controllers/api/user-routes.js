const router = require('express').Router();
const User = require('../../models/User');

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = dbUserData.get({ plain: true });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      req.session.user_id = newUser.id;

      return res.status(200).json(newUser);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    console.log(dbUserData);

    if (!dbUserData) {
      console.log('Invalid email');
      return res
              .status(400)
              .json({ message: 'Incorrect email or password. Try again!' });
    }

    // const validPassword = dbUserData.checkPassword(req.body.password.toString());

    // if (!validPassword) {
    //   console.log('Invalid password');
    //   return res.status(400).json({ message: 'Incorrect email or password. Try again!' });
    // }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.user_id = dbUserData.id;

      res
      .status(200)
      .json({ message: 'Logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } else {
    return res.status(404).end();
  }
});

module.exports = router;