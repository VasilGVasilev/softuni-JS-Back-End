const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: [true, 'Name is required']
    },
    // The age is required and should be at least 1 and no longer than 100 characters.
    // It is logical to have min, max with Numbers, since -10 is valid according to characters, but I am following the instructions
    age: {
        type: Number,
        minLength: 1,
        maxLength: 100,
        required: [true, 'Age is required']
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true, 'Description is required']
    },
    location: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true, 'Location are required']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: /^https?:\/\//
    },
    commentList: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'user'
    }],
    owner: { // one to many, one crypto per owner (reference shows which is owner) 
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }        
})

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;