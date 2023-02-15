const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    headline: {
        type: String,
        minLength: 4,
        required: [true, 'Headline is required']
    },
    location: {
        type: String,
        minLength: 8,
        required: [true, 'Location is required']
    },
    companyName: {
        type: String,
        minLength: 3,
        required: [true, 'Company name is required']
    },
    companyDescription: {
        type: String,
        minLength: 40,
        required: [true, 'Company description is required']
    },
    usersApplied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    author: { // one to many, one crypto per owner (reference shows which is owner) 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }        
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;