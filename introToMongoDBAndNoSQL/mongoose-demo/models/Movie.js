const mongoose = require('mongoose');

// SQL good practice -  enforcing schema that DB is based on, signature for Mongoose
const movieSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Movie title is required'],
        minlength: 2,

    },
    description: String,
    genres: {
        type: String,
        enum: ['action', 'comedy', 'thriler', 'horror'],
        required: false,
    },
    imageUrl: String,
    year: {
        type: Number,
        min: [1888, 'The year {VALUE} should not be higher than 1888'], //built-in validator
        required: false,
    },
});



// add method ! not persisted on DB
movieSchema.methods.getInfo = function() {
    return `${this.title} - ${this.description || 'n/a'}`;
};

// or 
// movieSchema.method('getInfo', function() {
//     return `${this.title} - ${this.description || 'n/a'}`;
// });
// use function expression because it perists the context to use 'this'

    // see console.log(movie.getInfo()); in movieController, now commented out

    // log when create new movie:

    // Iron Man - n/a
    // Batman - n/a
    // Third Test - some description here


// a piece of data that is not persisted on DB but is accessible
movieSchema.virtual('isNew')
    .get(function() {
        return this.year >= 2020
    });

// complex validator
movieSchema.path('title').validate(function() {
    return this.title.length >= 2 && this.title.length <= 20;
}, `Movie title should be less than 20 characters and more than 2!`);

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;

// module.exports vs exports
// exports. is for exporting functions and values individually
// module.exports is for exporting the whole module

// db.movies.updateOne({title: 'New test movie'}, {$set: {description: 'Modified description', year: 2021}});