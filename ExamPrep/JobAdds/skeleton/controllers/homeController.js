const router = require('express').Router();
const jobService = require('../services/jobService')

router.get('/', async (req, res) => {
    const jobs = await jobService.getAll();
    res.render('home', {jobs})
})

module.exports = router;