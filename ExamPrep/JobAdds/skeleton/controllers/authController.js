const router = require('express').Router();

const authService = require('../services/authServices');

const { isAuth } = require('../middlewares/authMiddleware')

const { getErrorMessage } = require('../utils/errorUtils')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token)
        res.redirect('/')    
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) }) //return in catch is used to stop further execution
    }//auth/login better than ./auth/login
    


})

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;
    // register and auto login
    try {
        const token = await authService.register(username, email, password, repeatPassword)
        res.cookie('auth', token)
        res.redirect('/') 
    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) }) //to differentiate between monogoose Model errors and services error     
    }
})

router.get('/logout', isAuth,  (req, res) => { //secutiry requirement only logged in can log out -> we check isAuth middleware then we execute logic of this particluar router
    res.clearCookie('auth');
    res.redirect('/')
})

module.exports = router;