const mongoose = require('mongoose')

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 6,
        required: [true, 'Name is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required']
    },
    year: {
        type: Number,
        min: 1850,
        max: 2021,
        required: [true, 'Year is required']
    },
    city: {
        type: String,
        minLength: 4,
        required: [true, 'City is required']
    },
    image: {
        type: String,
        validate: /^https?:\/\//,
        required: [true, 'Home image is required']
    },
    description: {
        type: String,
        maxLength: 60,
        required: [true, 'Property description is required']
    },
    availablePieces: {
        type: Number,
        min: 0,
        max: 10,
        required: [true, 'Available pieces are required']
    },
    tenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: { // one to many, one crypto per owner (reference shows which is owner) 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }        
})

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;