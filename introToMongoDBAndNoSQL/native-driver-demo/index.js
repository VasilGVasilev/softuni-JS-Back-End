const express = require('express');
const hbs = require('express-handlebars');
const { MongoClient } = require('mongodb'); //class that comes with node.js driver for mongoDB, used for establishing connection

const app = express();

// Connection to URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect()
    .then(() => {
        console.log('DB Connected successfuly');
    });

const db = client.db('movieSuggester');
const moviesCollection = db.collection('movies');

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
// no need for app.set('views', './views') config because this is the default

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/movies', async (req, res) => {
    let movies = await moviesCollection.find().toArray();

    res.render('movies', { movies })
})

app.listen(5000, () => console.log('Server is listening on port 5000...'));
