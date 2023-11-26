// Function to check if the user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Export the middleware
module.exports = withAuth;