const jwt = require('../lib/jsonwebtoken')
const {SECRET} = require('../constants')

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    // if user is logged in, validate token
    if(token){
        // trycatch to catch invalid token
        try {

            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken //so that it is accessible for each request, thus, actions afterwards so that we can have user specific behavior -> ownership; no collision since only one user per browser is the expected behaviour
            // res.local is like a global var that lives in the request
            res.locals.isAuthenticated = true; //for templates
            res.locals.user = decodedToken; //for templates

        } catch (error) {

            res.clearCookie('auth') //invalid token but still deleted from browser cookies
            return res.status(401).render('home/404') //return so that it exits execution before going to next() and, thus, preventing from forwarding it
        
        }
    }

    // if user not logged in, ignore and just let execution continue
    next()
}

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/404')
    }

    next()
}

exports.isGuest = (req, res, next) => {
    if(req.user) {
        return res.redirect('/404')
    }

    next()
}