const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const app = express();

app.use('/static', express.static('public'));

app.use(express.urlencoded({extended: false})); //necessary so that you can read the req.body of POST request

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views'); 
//when starting the app, the app by means of res.render('index',{OPTIONS}), searches the views in root/views -> the root here being Papazov Demo
// you have to set it to root/src/views || ['Papazov Demo']/src/views || ./src/views

// In the case of app.set('views', './views'), the setting being changed is 'views', 
// which is the directory where the application's view templates are located. 
// The value being set is './views', which is the path to the views directory relative to 
// the root directory of the application.

// Setting the 'views' setting allows Express to know where to find the view templates 
// that you want to render when a request is made to your application. 

app.use(routes); //how the rendering works ->
// routes -> router.use('/', homeController) -> res.render('index', { cubes, search, from, to });
// res.render -> handlebars expects a main.hbs in a laywouts folder to begin with, it's the main skelelton
// with each res.render(FILE, VARIABALES) then this main.hbs is used as skeleton and {{{body}}} is replaced with FILE

// OFFICIAL express-handlebars explanation LAYOUT:
// A layout is simply a Handlebars template with a {{{body}}} placeholder. 
// Usually it will be an HTML page wrapper into which views will be rendered.
// This view engine adds back the concept of "layout", which was removed in Express 3.x. 
// It can be configured with a path to the layouts directory, 
// by default it's set to relative to express settings.view + layouts/
// There are two ways to set a default layout: configuring the view engine's defaultLayout property, 
// or setting Express locals app.locals.layout.


app.listen(5000, () => console.log(`App is listening on port 5000`));
