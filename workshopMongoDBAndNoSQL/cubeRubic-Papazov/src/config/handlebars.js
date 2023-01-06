const handlebars = require('express-handlebars');

// app imported via input in function in index.js 
module.exports = (app) => {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));
    
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
};
