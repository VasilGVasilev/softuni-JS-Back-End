// create a router attach actions to it and export it to be used in app.use(), 
// which mounts specified middleware functions at specified path

const router = require('express').Router();
const { Movie } = require('../models/Movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().lean();
    // model is a promise
    // the model movie is not only class like in OOP but it allows you to access the whole
    // DB .find() is to show cursor (like a bookmark, it does not give all info, but only specific)
    // solution is .lean()

    // movies.forEach(movie => {
    //     console.log(movie.getInfo());
    //     console.log(movie.isNew);
    // });

    res.render('movies', { movies }); 
    // res.render(view [, locals] [, callback])
    // Renders a view and sends the rendered HTML string to the client. Optional parameters:
    // -> locals, an object whose properties define local variables for the view.
});

router.get('/:movieId', async (req, res) => { //each movie is in <a href=_id>
    console.log(req.params.movieId);
    // Movie.find({_id: req.params.movieId}).lean() -> finds all with that specific id, if find() was empty -> finds all, namely it returns all
    // let movie = await Movie.findOne({_id: req.params.movieId}).lean();
    let movie = await Movie.findById(req.params.movieId).lean(); //we take that _id via req.params.movieId

    res.render('movieDetails', {movie})
});

router.get('/create', (req, res) => {
    res.render('createMovie');
});

router.post('/create', async (req, res) => {
    // First way to create db document
    // const movie = new Movie(req.body);
    // let savedMovie = await movie.save();

    // Second way to cerate db document
    let savedMovie = await Movie.create(req.body);
    console.log(savedMovie);

    res.redirect('/movies');
})

module.exports = router;