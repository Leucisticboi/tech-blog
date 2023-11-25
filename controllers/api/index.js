const router = require('express').Router();

// Imort all the API routes from /api files
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Add URL parameters to all the imported routes
router.use('/users', userRoutes);
router.use('/blog', postRoutes);
router.use('/comment', commentRoutes);

// Export the router
module.exports = router;
