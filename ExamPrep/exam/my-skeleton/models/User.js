const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, 'Password is required']
    }     
})

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('user', userSchema);

module.exports = User;