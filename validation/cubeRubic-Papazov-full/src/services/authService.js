const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { secret, saltRounds } = require('../constants'); //secret is usually generated via ENV Vars

exports.register = async ({ username, password, repeatPassword }) => {
    // TODO: return form validation message
    // if (password !== repeatPassword) {
    //     return false;
    // }

    // hashing is now made on the User Model with userSchema.pre('save', function(next))
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

    // if there is user and the password validation is passed
    // create token

    // Promise(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<any>
    // A callback used to initialize the promise. This callback is passed two arguments: a resolve callback used 
    // to resolve the promise with a value or the result of another promise, and a reject callback used to reject 
    // the promise with a provided reason or error.


    // jwt.sign is an asynchroinous callback in an async login function!!!!
    let result = new Promise((resolve, reject) => {
    
        // we return the token, but why do we have it as a promise here?
        // see at bottom

        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {// payload is only the necessary -> id and username
       
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });

    // another way is:
    // const { promisify } = require('util'); 
    // const jwtPromiseSign = promisify(jwt.sign)
    // jwtPromiseSign(args)
    return result;
};

// exports.login is an async function that needs to return a result from an asynchronious callback function jwt.sign
// the result being the token
// jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {// payload is only the necessary -> id and username
//          if (err) {
//              return;
//          }
//          // how do you extract the token?
//         //  we cannot
//         // if it were the synchronious jwt would return a string, yet, you cannot block the event loop for one login
//         // the asynchronious way is via callback, but we cannot use return
//         // SOLUTION:
//         // create a new promise that will be stored in result, result will be returned and when used, you will await it. see authController /login, let token = await authService.login(req.body);
//         // use the reject, resolve structure of defining a new Promise to populate (err, token) callback
//      });
//  console.log('result ', result); 
//  >> undefined