const router = require('express').Router();

// add routes
const homeController = require('./controllers/homeController');

// attach controllers to router middleware
router.use(homeController)

module.exports = router