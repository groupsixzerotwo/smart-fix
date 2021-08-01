const router = require('express').Router();

const homeRoutes = require('./home-routes');
const jobOrdersRoutes = require('./jobOrders-routes');
const forumsRoutes = require('./forums-routes');

router.use('/', homeRoutes);
//Orders page
router.use('/orders', jobOrdersRoutes);
//Forums page
router.use('/forums', forumsRoutes);

module.exports = router;