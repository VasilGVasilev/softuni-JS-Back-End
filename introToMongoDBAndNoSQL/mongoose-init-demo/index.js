// init
const express = require('express')
const app = express();
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const movieController = require('./contollers/movieController')

const url = 'mongodb://localhost:27017/movieSuggester';

// connect to DB

mongoose.connect(url)
    .then(()=>{
        console.log('DB connected');
    })
    .catch((err)=>{
        console.log('DB Error: ', err);
    })

// decode req.body with POST 
app.use(express.urlencoded({extended:false}))

// setting hbs
app.engine('hbs', hbs.engine({
    extname:'hbs'
}))
app.set('view engine', 'hbs');

// default home route
app.get('/', (req, res) => {
    res.render('home');
});

// movie routes abstracted in separate module
app.use('/movies', movieController)

app.listen(5000);