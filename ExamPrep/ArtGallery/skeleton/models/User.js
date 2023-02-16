const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        minLength: 3,
        required: [true, 'Password is required']
    },
    address: {
        type: String,
        minLength: 20,
        required: true
    },
    myPublications: [{ // useful when displaying candidates for my add, thus, use populate on these adds, to extract info -> email and description
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }]       
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