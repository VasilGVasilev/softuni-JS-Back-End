// regsiter user and hashed pass

const router = require('express').Router();
const userSession = require('../data/db');
const bcrypt = require('bcrypt');

const saltRounds = 15;

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    let { username, password } = req.body

    if(userSession[username]){
        res.status(400).send('User already exists')
    }
    const hash = await bcrypt.hash(password, saltRounds);

    userSession[username] = {
        username,
        hash
    }
    res.redirect('/login')
    
});


module.exports = router;
