const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
    },
    username: {
        type: String,
        minLength: 5,
        required: [true, 'Username is required']
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

const User = mongoose.model('User', userSchema);

User.schema.path('name').validate(function(value) {
    return /^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(value);
  }, 'Firstname Lastname is required');

module.exports = User;