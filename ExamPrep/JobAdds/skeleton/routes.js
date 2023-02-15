const router = require('express').Router();

// add routes
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const jobController = require('./controllers/jobController');


// attach controllers to router middleware
router.use(homeController);
router.use(authController);
router.use('/job', jobController)
router.all('*', (req,res)=>{
    res.render('home/404')
})
module.exports = router