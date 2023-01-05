const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const movieController = require('./controllers/movieController');

const app = express();
const url = 'mongodb://localhost:27017/movieSuggester';

mongoose.connect(url)
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => {
        console.log('DB ERror: ', err);
    })

app.use(express.urlencoded({extended: false}));
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/movies', movieController);
// NB routers a mini-apps that abstract a piece of the logic so that it does not clutter the main app
// /movies path has a few options so it is best to move it into a separate controller

app.listen(5000, () => console.log('Server is listening on port 5000...'));
