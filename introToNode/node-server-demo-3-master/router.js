const routes = {};

// routes are not hardcoded into router => need for register

function register(method, path, handler) {
    if (routes[path] == undefined) {
        routes[path] = {};
    }
    routes[path][method] = handler;
}

// req, res like e in eventListener => no need to put them in match in index.js but here useful, their info comes from client
function match(req, res) {
    console.log('>>>', req.method, req.url);

    const url = new URL(req.url, `http://${req.headers.host}`); //needs base too so two args

    let handler;
    const actions = routes[url.pathname];
    if (actions != undefined) {
        handler = actions[req.method]; // handler is basically routes[path][method], a bit confusing because handler = routes[path][method]; which in routes object = handler
    }

    if (typeof handler == 'function') {
        handler(req, res);
    } else {
        routes.default['GET'](req, res);
    }
}

module.exports = {
    register,
    get: register.bind(null, 'GET'), //partial application
    post: register.bind(null, 'POST'), //partial application
    match
};