const express = require('express');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const userSessions = {};

const app = express();
const saltRounds = 10;
const secret = 'mysupersecretsecret';

app.use(cookieParser('', {}));
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

// my middleware for token verification with closure
let greeting;
app.use((req, res, next) => {
    let token = req.cookies['session']; //this is readable only due to app.use(cookieParser()) above

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).send('Invalid token')
            }
            greeting = decodedToken.email;
        });
    } else {
        greeting = 'Guest';  
    }
    next()
})
    

app.get('/', (req, res) => {
    console.log(greeting);
    res.render('home', { greeting });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (userSessions[email]) {
        res.status(400).send('User allready exists');
    }

    const hash = await bcrypt.hash(password, saltRounds); //bcrypt.hash(password, salt string || saltRounds number) thus, you can let bcrypt generate its salt alone
    // instead of const salt = await bcrypt.genSalt(saltRounds); const hash = await bcrypt.hash(req.params.password, salt);
    userSessions[email] = {
        email,
        password: hash
    }

    res.redirect('/login');
    // where the set hash will be validated:
        // await bcrypt.hash(password, saltRounds);
        // await bcrypt.compare(password, userSessions[email].password);
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const isAuthenticated = await bcrypt.compare(password, userSessions[email].password);

    if (isAuthenticated) {
        const token = jwt.sign({ email }, secret, { expiresIn: '2d' }); //email has to be in an object if you are to set option expiresIn, too, since it has to be an object likewise
        res.cookie('session', token, { httpOnly: true }); //client cannot session highjack, and is possible via setting an arg in app.use(cookieParser('', {}));
        res.redirect('/');
    } else {
        res.status(401).send('Wrong username or password');
    }
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));

// logic
// in register set hashed password into userSessions via bcrypt
// in login compare the input with the hash password via bcrypt
// in login if authenticated == true, set a token via jwt.sign(email, secret)
// in login set the token as a value in Storage -> Cookies -> localhost via res.cookie
// in /home set the req.cookies['session'] that stores the token in a new token var
// in /home verify token via jwt(token, secret, callback(err, decodedToken))
// NB jwt uses callbacks
