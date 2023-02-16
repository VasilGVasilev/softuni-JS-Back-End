const router = require('express').Router();
const jobService = require('../services/jobService')

router.get('/', async (req, res) => {
    const allJobs = await jobService.getAll();
    const jobs = allJobs.slice(0,2) //recent three only
    res.render('home', {jobs})
})

module.exports = router;