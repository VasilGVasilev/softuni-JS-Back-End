const router = require('express').Router();

// add routes
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController')

// attach controllers to router middleware
router.use(homeController);
router.use(authController)

module.exports = router