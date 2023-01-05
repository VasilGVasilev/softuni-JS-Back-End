const router = require('express').Router();
const {Movie} =  require('../models/Movie');

router.get('/', async(req, res) => {
    const movies = await Movie.find().lean(); // async/await so that retrieving DB info is not blocking the main thread 
    res.render('movies', {movies});
})

module.exports = router;