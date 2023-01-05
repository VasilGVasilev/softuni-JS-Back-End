const router = require('express').Router();
const {Movie} =  require('../models/Movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().lean(); // async/await so that retrieving DB info is not blocking the main thread 
    res.render('movies', {movies});
})

router.get('/create', (req, res) => {
    res.render('createMovie')
})

router.post('/create', (req, res) =>{
    console.log(req.body); // you need to decode the browser encoding => app.use(express.urlencoded({extended:false})) in index.js top
    res.redirect('/')
})
module.exports = router;