const router = require('express').Router();
const {Movie} =  require('../models/Movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().lean(); // async/await so that retrieving DB info is not blocking the main thread 
    res.render('movies', {movies});
})

router.get('/create', (req, res) => {
    res.render('createMovie')
})

router.post('/create', async (req, res) =>{
    // console.log(req.body); // you need to decode the browser encoding => app.use(express.urlencoded({extended:false})) in index.js top

    // First way to cerate db document
    let savedMovie = await Movie.create(req.body);
    // Or Second way
        // const movie = new Movie(req.body);
        // let savedMovie = await movie.save();
    res.redirect('/')
})
module.exports = router;