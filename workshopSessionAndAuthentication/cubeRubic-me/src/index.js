// [x] add routes and controllers for login and register
// [x] create tokenization
// [ ] check if there is token for dynamic navbar
// ----------------------------------------
// [ ] User model add by watching lecture
// [ ] add edit and delete via detials link

const express = require('express');

const { initializeDatabase } = require('./config/database');
const routes = require('./routes');
const app = express();
const cookieParser = require('cookie-parser')

// attach hbs by inputting app in this function that returns the hbs require()(app)
require('./config/handlebars')(app);


// To create a virtual path prefix (where the path does not actually exist in the 
// file system) for files that are served by the express.static function, specify a 
// mount path for the static directory, as shown below:
app.use('/static', express.static('public'))
// Now, you can load the files that are in the public directory from the /static path prefix.


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('', {}));

// app.use((req, res, next) => {
//     let token = req.cookies['session'];
//     if (token) {
//         jwt.verify(token, secret, (err, decodeToken) => {
//             if (err){
//                 return res.status(401).send('Invalid token')
//             }
//             {{{body}}} with guest navbar
//         })
//     } else {
//         {{{body}}} with logged-in user navbar
//     }
//     next();
// })

app.use(routes);

// first start DB then start server
// mongoose.connect(url) returns a promise, thus, the .then(app.listen()).catch() syntax
initializeDatabase()
    .then(() => {
        app.listen(5000, () => console.log(`App is listening on port 5000`));
    })
    .catch((err) => {
        console.log('Cannot connect to db:', err);
    });
