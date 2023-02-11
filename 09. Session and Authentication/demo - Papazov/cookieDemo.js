const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// middleware that is for every request so that you can read req.cookies in app.get() below
app.use(cookieParser());

app.get('/', (req, res) => {

    // search cookie in response header in network -> set.cookies, alternatively and manually -> res.setHeader('Set-Cookie', 'test=Some;');
    res.cookie('test', 'Some test value');
    res.cookie('test2', 'Some test value2');
    // first send Headers res.cookie(), then send Stream res.send()
    res.send('Hello World');
});

// why do it, when we set a res.cookie, the browser will be made to set a cookie as an identificator
// and when the browser makes another request -> /cats -> in network -> headers -> cookie will be persisted in the new request to the server
// you can read it via req.cookies, it shows the cookies, initially set by the server on the browser and are sent by the browser to the server
// with each new request
// MIND that if you delete the upper res.cookie that is setting cookies from the code, it doesnt matter, the cookies will persist on the browser

app.get('/cats', (req, res) => {
    console.log(req.cookies);
    
    res.send('I love cats');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
