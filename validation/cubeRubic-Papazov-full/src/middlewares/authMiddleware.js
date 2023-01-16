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
            res.locals.user = decodedToken; // attaches user var to each request so real time check if there is token or not and whose is it

            // MAKES ADDED PROPERTIES (here, user) AVAILABLE THROUGHOUT THE APP -> in templates, too
                // Use this property to set variables accessible in templates rendered with res.render. 
                // The variables set on res.locals are available within a single request-response cycle, 
                // and will not be shared between requests.
                // like app.locals below BUT it is per request => so per user, too
            
            // The "app.locals" object has properties that are local variables within the application. 
            // These variables are local to the application and are very useful.
            // It is the same for all users, so cannot be used per user experience, it is useful for all users
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