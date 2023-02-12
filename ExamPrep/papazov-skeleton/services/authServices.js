const User = require('../models/User')
const bcrypt = require('bcrypt')
const {SECRET} = require('../constants')
const jwt = require('../lib/jsonwebtoken')

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, repeatPassword) => {

    // Validate password with repeatPassword
    if(password !== repeatPassword) {
        throw new Error('Password mismatch')
    }

    // Check if user with either such email or with such username exists in DB
    const existingUser = await User.findOne({
        $or: [
            {email},
            {username}
    ]})

    if(existingUser){
        throw new Error('User exists')
    }

    // Validate password here instead of in User model because you are passing in there a hashed pass, not the original! length, 
    // TODO


    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({username, email, password: hashedPassword})
}

exports.login = async (email, password) => {

    // User exists
    const user = await this.findByEmail(email)
    if (!user) {
        throw new Error('Invalid email or password')
    }

    // Password is valid
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid){
        throw new Error('Invalid email or password')
    }

    // Generate token
    const payload = {
        _id: user._id,
        email,
        username: user.username
    };
    const token = await jwt.sign(payload, SECRET)

    return token;
}