const router = require('express').Router();
const housingService = require('../services/housingService')

router.get('/', async (req, res) => {
    const housings = await housingService.getLastThree();

    res.render('home', {housings})
})

module.exports = router;