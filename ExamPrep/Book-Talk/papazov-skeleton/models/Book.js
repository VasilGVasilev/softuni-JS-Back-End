const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        required: [true, 'Username is required']
    },
    author: {
        type: String,
        minLength: 5,
        required: [true],
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//
    },
    bookReview: {
        type: String,
        minLength: 10,
        required: true
    },
    genre: {
        type: String,
        minLength: 3,
        required: true
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: { // one to many, one crypto per owner (reference shows which is owner) 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }        
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;