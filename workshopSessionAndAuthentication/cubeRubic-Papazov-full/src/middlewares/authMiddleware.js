const jwt = require('jsonwebtoken');
const {promisify}  = require('util');

const { sessionName, secret } = require('../constants');

const jwtVerify = promisify(jwt.verify); //jwt.verify is synchronious or asynchronious CALLBACK, but not a promise, thus, same logic as with jwt.sign

// we want to verify if user session has token, but not necessarily reject access, thus, this is middleware set in global index via app.use()
exports.auth = async (req, res, next) => {
    let token = req.cookies[sessionName];

    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken; //attached to request so that later actions after middleware can access it
            res.locals.user = decodedToken;
        } catch(err) {
            console.log(err);
            return res.redirect('/404');
        }
    }

    next();
};

// this middlware is specific, it grants/denies access based on 1) having a token that 2) is not rejected via app.use(auth)
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }

    next();
};