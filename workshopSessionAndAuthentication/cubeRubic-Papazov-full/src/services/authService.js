const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { secret, saltRounds } = require('../constants');

exports.register = async ({ username, password, repeatPassword }) => {
    // TODO: return form validation message
    // if (password !== repeatPassword) {
    //     return false;
    // }

    // let hashedPassword = await bcrypt.hash(password, saltRounds);

    // let createdUser = User.create({
    //     username,
    //     password: hashedPassword,
    // });

    let createdUser = await User.create({
        username,
        password,
        repeatPassword,
    });

    return createdUser;

    // let createdUser = new User({
    //     username,
    //     password: hashedPassword, 
    // });

    // createdUser.save();
};

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username }); //.find() would return []

    // validation 
    if (!user) {
        // TODO: add message
        return; //intuitively, res.redirect() BUT comply with architecure, no res, req in service; this returns undefined
    } //token in authController will be undefined, thus,         if (!token) => return res.redirect('/404')

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Invalid username or password'
        };
    }

    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    return result;
};