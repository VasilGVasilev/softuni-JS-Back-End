const mongoose = require('mongoose');

// define schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required'],
        minlength: 2,

    },
    description: String, //this field is not required
    year: {
        type: Number,
        min: [1888, 'The year {VALUE} should not be higher than 1888'],
        required: false,
    },
    // the Schema is not set to these three fields only, it is a non-relational DB, the POST request may add a field and an irregular document be created in the collection
});

// create a model of the schema

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;