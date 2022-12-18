const express = require('express');

const app = express() //factory function that creates a new instance -> app === server in http.createServer

app.get('/', (req, res) => {
    res.write('Hello world');
    res.end();
});

app.listen(5000, ()=> console.log('Server listening on port 5000...'));