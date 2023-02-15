const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minLength: 5,
        required: [true, 'Password is required, min 5 characters']
    },
    description: {
        type: String,
        minLenght: 40,
        required: [true, 'Description is required, min 40 characters']
    },
    myAds: { // useful when displaying candidates for my add, thus, use populate on these adds, to extract info -> email and description
        type: mongoose.Types.ObjectId,
        ref: 'Job'
    }      
})
// if validation in service -> problem that I cannot run Model validators on the hashed there pass (hashedPassword <-> password mismatch of wording to pass in Model)
// unvalidated, evena an empty string is hashed automatically becomeing greater than any minLength, thus, invalid data is stored
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