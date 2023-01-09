const express = require('express');
const expressSession = require('express-session');
// adds _parsedOriginalUrl, sessionStore, sessionID, route to Request() used later to set req.session.username
// req.session.username makes the browser set a key:value pair on the user
// this key:value pair is then accessible for whole session, same user can read it via other path (/, /cats)
// expressSession generates a unique cookie with some cryptic value 
// BUT 'Pesho' + Math.random() string is not saved on the browser, rather on server
// but this 'Pesho' string is connected to user via this cryptic cookie
// the server uses expressSession to create this cookie that is cryptically set on browser via cookieId
// so that the server will know in the future what info to show to this particular user referencing the specific cookieId
// Thus, ensuring that the cryptic cookie is the only identificator known to the browser, while the data is saved on server/DB 
// and the connection and respective identification is done by this interplay of cookie on browser and session on server

const app = express();

// initial setup
app.use(expressSession({
    secret: 'keyboard cat', //secret encrypts session Id
    resave: false, // should session be saved everytime TRUE || FALSE only when change occurs
    saveUninitialized: true, //automatically creates session even if nothing is modified -> happens when there is communciation with user, simple login
    cookie: { secure: false } //only through http TRUE || https FALSE
}))

app.get('/', (req, res) => {
    req.session.username = 'Pesho' + Math.random();
    res.send('Home page');
});

app.get('/cats', (req, res) => {
    console.log(req.session);
    res.send('cats');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
