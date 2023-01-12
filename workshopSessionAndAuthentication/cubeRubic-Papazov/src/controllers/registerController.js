// register user and hashed pass

// very important on circular dependancy
// if you make a sort of closure for userSession to be in index.js
// and instead of passing it as an argument via routes and controllers
// you export it and import it here in registerController which is a childNode of index.js
// when you have to use userSession, the app will crash due to circular dependancy
// index is exporting, meaning it is making registerController its parentNode

// my view is that exports navigate you to the parentNode
// index or app never have exports for that reason, they are usaully root
// in this application, we have services used by more than one controller
// but both services rely on DB that ends the node tree, cubeController uses
// both cubeServices and accessory service while accessorry service is used
// by accessoryController too, but there is no crash due to accessory relying on DB
// that is why DB exports to services, services export to controllers, controllers export to routes, routes export to index

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
