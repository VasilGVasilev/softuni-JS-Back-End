const router = require('express').Router();

const { isEmail } = require('../utils/validators');
const authService = require('../services/authService');
const { sessionName } = require('../constants');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {

    // Global error handling utilizing next() to pass on error to errorHandlerMiddleware
    // disadvanatage is that if you dont have a view to some route -> debugging will be hard
    if (!isEmail(req.body.username)) {
        // return res.status(404).send('Invalid email');
        let error = {
            message: 'Invalid email',
            status: 401,
        };

        return next(error); //putting the error in next is for the errorHandlerMiddleware to catch
    } //the middleware is, in fact, set after the app.use(routes) in index.js
    // middlewares can be post, not only, pre main app logic /Routers/
    
    // Local error handling - error thrown in Service catched here in Controller
    try {
        await authService.register(req.body);
        
        res.redirect('/auth/login');
    } catch (error) { //catching the error from authService.register
        // res.locals.error = error.message;
        res.status(401).render('auth/register', {error: error.message}); //system error due to required in User Model
    }
    // NB session library is used when you want both error message and redirect

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    try {
        let token = await authService.login(req.body);
            
        if (!token) {
            return res.redirect('/404');
        }

        res.cookie(sessionName, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) { //catching the error from authService.login
        res.status(400).render('auth/login', { error: error.message })
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(sessionName); //simply remove cookie with token, thus, the app will treat the user as a guest
    res.redirect('/');
});

module.exports = router;
