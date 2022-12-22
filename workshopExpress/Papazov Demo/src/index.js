const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const app = express();

app.use('/static', express.static('public'));

app.use(express.urlencoded({extended: false}));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views'); 
//when starting the app, the app by means of res.render('index',{OPTIONS}), searches the views in root/views -> the root here being Papazov Demo
// you have to set it to root/src/views || ['Papazov Demo']/src/views || ./src/views

app.use(routes);

app.listen(5000, () => console.log(`App is listening on port 5000`));
