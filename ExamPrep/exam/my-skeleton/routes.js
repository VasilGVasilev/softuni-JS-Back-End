const router = require('express').Router();

// add routes
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photoController =  require('./controllers/photoController')

// attach controllers to router middleware
router.use(homeController);
router.use(authController);
router.use('/photo', photoController);
router.all('*', (req,res)=>{
    res.render('home/404')
})

module.exports = router