req.user and res.locals.user 
    are both ways to attach user info to req<->res cycle, mind that it is only one such cycle (app.locals is for whole web app lifecycle)

    -> check on Request 
        the difference is mainly in req, when do we specifically need req:
        when we want server to decide on a request before it returns a response
        a protected route, for example, loggout is only available for logged-in users
        how do we not return a wrong response to the wrong user, we base our logic on attaching to the request
        Thus we attach 'exports.authentication' and in it the req.user = userInfo and later before logout handler is activated
        we check with isAuth if req.user is valid or false, because the necessary info that comes from the browser
        is attached to the request (req.user coming from the borwser), the server can check req.user's status and 
        grant or deny access to the logout

    -> no check on Request, so focus on Response
        on the other hand, res.locals.user is used mainly with templating where we do not have to make a check
        whether or not, rather what specifically the rendered template to include such as user specific info
        based on the already determined status in 'exports.authentication' 

    often we first set req.user for grant/deny user-specific behaviour and then we set res.locals.user to make response template rendering more specific