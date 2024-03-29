const router = require('express').Router();
const {body, validationResult} = require('express-validator');

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

// express-validator works so:
    // (1) put in validator between PATH and (req, res) as middleware
    // (2) store the potential errors in a var via const error = validationResult(req)
    // (3) check is error var is empty and react accordingly

router.post(
    '/create',
    isAuth,
    body('name', 'Name is required!').not().isEmpty(), // (1)
    body('description').isLength({min: 5, max: 120}), // (1)
    body('difficultyLevel', 'Difficulty Level is required to be in range 1 to 6').toInt().isInt({min: 1, max: 6}), //.toInt() is sanitizer, formally no difference between santizer and validator, but .isInt() changes the data from string to integer
    async (req, res) => {
        const cube = req.body; //extract info in variable cube

        cube.owner = req.user._id; //add one more property by using the req.user (provided by app.use(auth))

        const errors = validationResult(req); // (2)

        if (!errors.isEmpty()) { // (3)
            console.log(errors);
            return res.status(400).send(errors.array()[0].msg);
        }

        // Validate
        if (cube.name.length < 2) {
            return res.status(400).send('Invalid request');
        }

        // Save data
        try {
            await cubeService.create(cube); //cube is the combined result of cube by req.body and req.user._id
            // the latter being set in auth authMiddleware -> req.user = decodedToken; to carry on as stored variable with each request

            // see User model
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
);

// custom Sanitizer 
    // const { sanitizeParam } = require('express-validator');

    // router.post('object/:id', sanitizeParam('id').customSanitizer(value => {
    //     return isObjectIdOrHexString(value);
    // }), (req, res) => {
    //     // Handle request...
    // })

router.get('/details/:id', async (req, res) => {
    
    const cube = await cubeService.getOneDetails(req.params.id).lean();
    const isOwner = cube.owner == req.user?._id;


    res.render('details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render('accessory/attach', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean()

    if (cube.owner != req.user._id) { //req.user we have attached the decodedToken to it, namely, (_id: user._id, username: user.username)
        // TODO Add message
        return res.redirect('/404');
    }

    cube[`difficultyLevel${cube.difficultyLevel}`] = true; //hack solution to generating selected option

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', async (req, res) => {
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);

    res.redirect(`/cube/details/${modifiedCube._id}`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean()

    // TODO: ADD is owner validation
    res.render('cube/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId);

    res.redirect('/');
});


module.exports = router;
