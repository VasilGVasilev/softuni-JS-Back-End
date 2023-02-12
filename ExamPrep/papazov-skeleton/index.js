const express = require('express');
const handlebars = require('express-handlebars')

const routes = require('./routes')

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');

app.use('/static', express.static('public')) //tells to search in 'public' if you have '/static', optimised solution due to targeting not all request, rather only those with '/static'
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(5000, () => console.log('Server is running on port 5000...'))