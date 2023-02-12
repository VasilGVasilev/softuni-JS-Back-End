const User = require('../models/User')
const bcrypt = require('bcrypt')

const jwt = require('../lib/jsonwebtoken')
const SECRET = '457564cc85997c0d654e7f0458b1b780b726add7'

exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, email, password, repeatPassword) => {

    // Validate password with repeatPassword
    if(password !== repeatPassword) {
        throw new Error('Password mismatch')
    }

    // Check if user exists
    const existingUser = await this.findByUsername(username); // why this, is it because we are usin class-based logic accessing of class method?
    if(existingUser){
        throw new Error('User exists')
    }

    // Validate password here instead of in User model because you are passing in there a hashed pass, not the original! length, 
    // TODO


    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({username, email, password})
}

exports.login = async(email, password) => {

    // User exists
    const user = await this.findByEmail(email)
    if (!user) {
        throw new Error('Invalid email or password')
    }

    // Password is valid
    const isValid = await bcrypt.compare(user.password, password)
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