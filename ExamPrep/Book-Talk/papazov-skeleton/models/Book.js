const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        minLength: 5,
        required: [true, 'Author is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: /^https?:\/\//
    },
    bookReview: {
        type: String,
        minLength: 10,
        required: [true, 'Book review is required']
    },
    genre: {
        type: String,
        minLength: 3,
        required: [true, 'Genre is required']
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Stars are required']
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