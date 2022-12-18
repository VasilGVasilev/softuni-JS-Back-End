const express = require('express');

const app = express() //factory function that creates a new instance -> app === server in http.createServer
// its like app is the main function and you attach actions to make the application responsive (app.get, app.use, etc)



// Action - the entity on the server side that awaits the endpoint ('/') to be requested via GET to respond with the CB (req, res)
app.get('/', (req, res) => {
    res.send('hello world') //instead res.write() + res.end(); Express is another layer on top of http, so these work but are too low-level
});

app.post('/cats/', (req, res) => {
    // TODO: implement
    res.send('Cat posted')
});

app.put('/cats', (req, res) => {
    // TODO: implement
    res.send('Modify existing cat');
});

app.all('*', (req, res) => {
    res.status(404);
    res.send('Cannot find thid page');
});

// app.all() is used rarely due to app.use() middleware, USEFUL for wildcard '*' for error404
// BUT PUT IT AFTER ALL OTHER ACTIONS, since wildcard means all if it is above all others, it will consume them

    // Summary for app.all('*', fn) vs. app.use(fn):

    //     No difference in order of execution.
    //     app.use() fires regardless of methods, app.all() only fires for parser supported methods (probably not relevant since the node.js http parser supports all expected methods).

    // Summary for app.all('/test', fn) vs. app.use('/test', fn):

    //     No difference in order of execution
    //     app.use() fires regardless of methods, app.all() only fires for parser supported methods (probably not relevant since the node.js http parser supports all expected methods).
    //     app.use() fires for all paths that start with /test include /test/1/ or /test/otherpath/more/1. app.all() only fires if its an exact match to the requested url.x


app.listen(5000, ()=> console.log('Server listening on port 5000...'));