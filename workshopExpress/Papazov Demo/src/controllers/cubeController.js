const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create'); //app.set('views', './src/views') tells Express where to search for create
});

router.post('/create', async (req, res) => {
    const cube = req.body; //<form action="/cube/create" method="POST">

    // Validate
    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request');
    }

    // Save data
    try {
        await cubeService.save(cube);

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/details/:id', (req, res) => {
    const cube = cubeService.getOne(req.params.id);
    
    res.render('details', { cube });
});

module.exports = router;
