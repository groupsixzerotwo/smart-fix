const router = require('express').Router();

const homeRoutes = require('./home-routes');
const forumsRoutes = require('./forums-routes');

router.use('/', homeRoutes)
router.use('/forums', forumsRoutes)

module.exports = router;