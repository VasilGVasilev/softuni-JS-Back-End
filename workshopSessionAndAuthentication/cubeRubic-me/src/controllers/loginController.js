// compare user to ones in DB, create token for user, set token in cookie sessions

const router = require('express').Router();
const userSession = require('../data/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const secret = 'mytopsecret';

router.use(cookieParser('', {}));

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    let { username, password } = req.body

    const isAuthenticated = await bcrypt.compare(password, userSession[username].hash);

    if(isAuthenticated){
        const token = await jwt.sign({username}, secret, {expiresIn: '2d'});

        res.cookie('session', token, {httpOnly: true});
        res.redirect('/')
    } else {
        res.status(401).send('Wrong username or password')
    }

    
});


module.exports = router;
