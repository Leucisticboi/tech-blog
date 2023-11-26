const router = require('express').Router();

// Import all of the API routes from /api/index.js, along with home routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// Add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Export router functionality
module.exports = router;
