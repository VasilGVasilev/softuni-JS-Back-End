const router = require('express').Router();

const authService = require('../services/authServices');

const { isAuth } = require('../middlewares/authMiddleware')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token)
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;

    await authService.register(username, email, password, repeatPassword)

    res.redirect('/')
    // TODO login automatically inbetweeen register and home
})

router.get('/logout', isAuth,  (req, res) => { //secutiry requirement only logged in can log out -> we check isAuth middleware then we execute logic of this particluar router
    res.clearCookie('auth');
    res.redirect('/')
})

module.exports = router;