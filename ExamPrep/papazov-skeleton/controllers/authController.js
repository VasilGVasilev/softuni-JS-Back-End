const router = require('express').Router();

const authService = require('../services/authServices')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    const {email, password} = req.body;


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


module.exports = router;