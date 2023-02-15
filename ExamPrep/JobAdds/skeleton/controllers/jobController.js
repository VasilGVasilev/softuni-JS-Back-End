const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')
const jobService = require('../services/jobService')
const { getErrorMessage } = require('../utils/errorUtils')

// isAuth is for security requirements
// If necessary lean!!
router.get('/catalog', async (req, res) => {
    const jobs = await jobService.getAll();
    res.render('job/catalog', {jobs}) //to test with empty catalog job: [], hbs takes priority over default JS empty array [] === true
})


router.get('/:jobId/details', async (req, res) => {
    const job = await jobService.getOne(req.params.jobId);
    const author = await jobService.getAuthor(job.author);
    job.authorEmail = author.email
    const candidates = await jobService.getAllCandidates(job.usersApplied)
    //view data so no problem to be acquired here in controller
    // const isOwner = job.owner.toString() === req.user?._id // job.owner will be returned as an object, so use toString()
    const isOwner = job.author == req.user?._id //optional chaining -> what if req.user is undefined because no user is logged int to popoulate req.user, easy with ?. which is => if there is req.user - good if req.user is undefined - return undefined (instead of executing an error due to undefined)
    const isApplied = job.usersApplied?.some(id => id == req.user?._id)
    res.render('job/details', {job, isOwner, isApplied, candidates}) //to test with empty catalog job: []
})

router.get('/:jobId/apply', isAuth, async (req, res) => {
    await jobService.apply(req.user._id, req.params.jobId);
    res.redirect(`/job/${req.params.jobId}/details`)
})

router.get('/:jobId/edit', isAuth, async (req, res) => {
    const job = await jobService.getOne(req.params.jobId)

    res.render('job/edit', { job })
})

router.post('/:jobId/edit', isAuth, async (req, res) => {
    const jobData = req.body;

    try {
        await jobService.edit(req.params.jobId, jobData)
    } catch (error) {
        const job = jobData
        return res.status(400).render('job/edit', {error: getErrorMessage(error), job})
    }

    // TODO: check if owner
    res.redirect(`/job/${req.params.jobId}/details`)
})

router.get('/:jobId/delete', isAuth, async (req, res) => {
    await jobService.delete(req.params.jobId)
    // TODO: check if owner
    res.redirect('/job/catalog')
})

router.get('/create', isAuth, (req, res) => {
    res.render('job/create')
})

router.post('/create', isAuth, async (req, res) => {
    const jobData = req.body;

    try {
        await jobService.create(req.user._id, jobData)
    } catch (error) {
        return res.status(400).render('job/create', {error: getErrorMessage(error)})
    }

    res.redirect('/job/catalog')
})


module.exports = router;