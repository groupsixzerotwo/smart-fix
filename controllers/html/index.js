const router = require('express').Router();

const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const forumsRoutes = require('./forums-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/forums', forumsRoutes);

module.exports = router;