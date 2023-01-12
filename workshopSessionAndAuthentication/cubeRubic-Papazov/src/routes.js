const express = require('express');

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');


const router = express.Router();

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
// router.use('/login', loginController);
router.use('/register', registerController);

module.exports = router;
