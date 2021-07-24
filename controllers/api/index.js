const router = require('express').Router();

const userRoutes = require('./user-routes');
const serviceRoutes = require('./service-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const jobRoutes = require('./job-routes');
const statusRoutes = require('./status-routes');
const assignmentRoutes = require('./assignment-routes');

router.use('/users', userRoutes);
router.use('/service', serviceRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/jobs', jobRoutes);
router.use('/status', statusRoutes);
router.use('/assignment', assignmentRoutes);

module.exports = router;