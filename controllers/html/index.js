const router = require('express').Router();

const homeRoutes = require('./home-routes');
const jobOrdersRoutes = require('./jobOrders-routes');
const forumsRoutes = require('./forums-routes');

router.use('/', homeRoutes);
router.use('/orders', jobOrdersRoutes);
router.use('/forums', forumsRoutes);

module.exports = router;