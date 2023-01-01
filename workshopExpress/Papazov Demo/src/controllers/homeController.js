const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/', (req, res) => {
    let { search, from, to } = req.query;

    const cubes = cubeService.getAll(search, from, to);

    res.render('index', { cubes, search, from, to });
    // res.render(view [, locals] [, callback])
        
        // The view argument is a string that is the file path of the view file to render. 
        // This can be an absolute path, or a path relative to the views setting. -> app.set('views', './src/views') WE HAVE SET THE HBS TEMPLATE ENGINE, SO IT SEARCHES 'index' in ./src/views
        // If the path does not contain a file extension, then the view engine setting determines the file extension. 
        // If the path does contain a file extension, then Express will load the module for the specified template engine (via require()) and 
        // render it using the loaded module’s __express function.
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
