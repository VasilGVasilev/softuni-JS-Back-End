const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;

    // Validate
    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request');
    }

    // Save data
    try {
        await cubeService.create(cube);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOneDetails(req.params.id).lean();

    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    // you can take data from two different services, the problem is if you make it a circular dependency controller takes from one service, one service takes from another, another service relies on intiial controller
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    // getAllAvailable
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();
    
    res.render('accessory/attach', {cube, accessories}); 
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
})

module.exports = router;
