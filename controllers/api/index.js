const router = require('express').Router();

const userRoutes = require('./user-routes');
const serviceRoutes = require('./service-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/service', serviceRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;