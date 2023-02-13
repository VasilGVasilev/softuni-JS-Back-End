const express = require('express');
const handlebars = require('express-handlebars');
const { mongoose } = require('mongoose');

const cookieParser = require('cookie-parser')
const { authentication } = require('./middlewares/authMiddleware')

const routes = require('./routes')

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');

app.use('/static', express.static('public')) //tells to search in 'public' if you have '/static', optimised solution due to targeting not all request, rather only those with '/static'
app.use(express.urlencoded({extended: false}))
app.use(cookieParser()) //set (res.cookie()) and read (req.cookies) cookies that persist in borwser memory and are accessible via each request

app.use(authentication)

app.use(routes)

mongoose.set('strictQuery', false); //deprication warning when starting app without it
mongoose.connect('mongodb://localhost:27017/crypto') //by making first [Model].create() in this app, the DB with collection and respective models are created

app.listen(3000, () => console.log('Server is running on port 3000...'))