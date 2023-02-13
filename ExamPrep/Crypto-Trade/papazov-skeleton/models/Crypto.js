const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String,
        required: [true]
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paymentMethod: {//enum -> only those strings are possible
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Enter only valid values!'
        },
        required: true
    },
    owner: { // one to many, one crypto per owner (reference shows which is owner) 
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }                
})

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;