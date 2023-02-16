const User = require('../models/User')
const {SECRET} = require('../constants')
const jwt = require('../lib/jsonwebtoken')

exports.findByUsername = (username) => User.findOne({username});


exports.register = async (username, password, repeatPassword, address) => {

    // Validate password with repeatPassword
    if (password !== repeatPassword) {
        throw new Error('Password mismatch')
    }

    // Check if user with either such email or with such username exists in DB
    const existingUser = await User.findOne({
        $or: [
            {username}
    ]})

    if(existingUser){
        throw new Error('User exists')
    }

    // Validate password here instead of in User model because you are passing in there a hashed pass, not the original! length, 
    // TODO

    await User.create({username, password, address})

    // login after successful register
    return this.login(username, password)
}

exports.login = async (username, password) => {

    // User exists
    const user = await this.findByUsername(username)
    if (!user) {
        throw new Error('Invalid username or password')
    }

    // Password is valid
    const isValid = await user.validatePassword(password)
    if (!isValid){
        throw new Error('Invalid username or password')
    }

    // Generate token
    const payload = {
        _id: user._id,
        username: user.username
    };
    const token = await jwt.sign(payload, SECRET)

    return token;
}