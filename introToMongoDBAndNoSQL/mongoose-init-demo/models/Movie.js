const mongoose = require('mongoose');

// define schema
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
        min: [1888, 'The year {VALUE} should not be higher than 1888'],
        required: false,
    },
});

// create a model of the schema

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;