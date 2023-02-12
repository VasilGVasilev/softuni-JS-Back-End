const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (username, email, password, repeatPassword) => {

    // Validate password with repeatPassword
    if(password !== repeatPassword) {
        throw new Error('Password mismatch')
    }
    // Check if user exists
    // TODO

    // Validate password here instead of in User model because you are passing in there a hashed pass, not the original! length, 
    // TODO


    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({username, email, password})
}