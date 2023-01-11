const router = require('express').Router();
const cubeService = require('../services/cubeService');

router.get('/', async (req, res) => {
    let { search, from, to } = req.query;

    // cubeService.getAll() is an async function, thus, its return is wrapped in a Promise -> cubeService.getAll(search, from, to) is a promise => await cubeService.getAll()
    const cubes = await cubeService.getAll(search, from, to);

    res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
