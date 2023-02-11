const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); //set up mongoose

const { secret, saltRounds } = require('../constants');


const userSchema = new mongoose.Schema({ //define new Schema
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Email should be unique'],
        validate: /[a-zA-Z0-9]/,
        minlength: 5
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: /[a-zA-Z0-9]/,
        minlength: 8,
    },
});


// VirtualType.prototype.set()

// Mongoose calls the setter function with the below 3 parameters.
//     value: the value being set.
//     virtual: the virtual object you're calling .set() on.
//     doc: the document this virtual is attached to. Equivalent to this.

// const virtual = schema.virtual('fullname');
// virtual.set(function(value, virtual, doc) {
//   const parts = value.split(' ');
//   this.name.first = parts[0];
//   this.name.last = parts[1];
// });

// const Model = mongoose.model('Test', schema);
// const doc = new Model();
// // Calls the setter with `value = Jean-Luc Picard'`
// doc.fullname = 'Jean-Luc Picard';
// doc.name.first; // 'Jean-Luc'
// doc.name.last; // 'Picard'


userSchema.virtual('repeatPassword').set(function(value) { //not all properties need to be persisted in DB
    if (this.password !== value) { // example of using (getter) and SETTER for validation like said in JS Advanced
        throw new Error('Repeat password should match password'); 
    }
});

userSchema.pre('save', function(next) { //old style -> execute next() in promise resolve
    bcrypt.hash(this.password, saltRounds) //this. relates to the User schema property
        .then(hashedPassword => {
            this.password = hashedPassword;

            next();
        });
});


const User = mongoose.model('User', userSchema); //create the defined above schema template in DB under name User -> collection users

module.exports = User;