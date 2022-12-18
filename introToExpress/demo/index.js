const express = require('express');

const app = express() //factory function that creates a new instance -> app === server in http.createServer
// its like app is the main function and you attach actions to make the application responsive (app.get, app.use, etc)

// Action - the entity on the server side that awaits the endpoint ('/') to be requested via GET to respond with the CB (req, res)
app.get('/', (req, res) => {
    res.send('hello world') //instead res.write() + res.end(); Express is another layer on top of http, so these work but are too low-level
});

app.listen(5000, ()=> console.log('Server listening on port 5000...'));