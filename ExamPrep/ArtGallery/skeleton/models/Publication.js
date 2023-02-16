const mongoose = require('mongoose')

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 6,
        required: [true, 'Title is required']
    },
    paintingTech: {
        type: String,
        maxLength: 15,
        required: [true, 'Painting technique is required']
    },
    artPicture: {
        type: String,
        validate: /^https?:\/\//,
        required: [true, 'Art picture is required']
    },
    certificate: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            message: 'Enter Yes or No!'
        },
        required: [true, 'Certificate of authencity is required']
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    author: { // one to many, one crypto per owner (reference shows which is owner) 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }        
})

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;