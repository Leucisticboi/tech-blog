const router = require('express').Router();
const { User } = require('../../models/user.js');

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
    // Extract user details from the request body
    const { username, email, password } = req.body;

    // Create a new user in the database
    const dbUserData = await User.create({
      username: username,
      email: email,
      password: password
    });

    // Get the plain object representation of the new user
    const newUser = dbUserData.get({ plain: true });

    // Save user details in the session and respond with success
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      req.session.user_id = newUser.id;

      return res.status(200).json(newUser);
    });
  } catch (err) {
    // Respond with an error status and details if an issue occurs during signup
    return res.status(500).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find the user in the database based on the provided email
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    console.log(dbUserData);

    const username = dbUserData.username;

    console.log('USERNAME:', username)

    // Check if the user exists
    if (!dbUserData) {
      console.log('Invalid email');
      return res.status(400).json({ message: 'Incorrect email or password. Try again!' });
    }

    // Save user details in the session and respond with success
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = username;
      req.session.user_id = dbUserData.id;

      res.status(200).json(username);
    });
  } catch (err) {
    // Respond with an error status and details if an issue occurs during login
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session and respond with success
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } else {
    // Respond with a 404 status if the user is not logged in
    return res.status(404).end();
  }
});

// Export the router
module.exports = router;
