const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')
const publicationService = require('../services/publicationService')
const { getErrorMessage } = require('../utils/errorUtils')

// isAuth is for security requirements
// If necessary lean!!
router.get('/catalog', async (req, res) => {
    const publications = await publicationService.getAll();
    
    res.render('publication/catalog', {publications}) //to test with empty catalog publication: [], hbs takes priority over default JS empty array [] === true
})

// router.get('/search', async (req, res) => {
//     const {email} = req.query //req.query due to being a GET request
//     const publication = await publicationService.search(email);
//     res.render('publication/search', {publication}) 
// })

router.get('/:publicationId/details', async (req, res) => {
    const publication = await publicationService.getOne(req.params.publicationId);
    const author = await publicationService.getAuthor(publication.author);
    publication.authorName = author.username
    // const candidates = await publicationService.getAllCandidates(publication.usersApplied)
    //view data so no problem to be acquired here in controller
    // const isOwner = publication.owner.toString() === req.user?._id // publication.owner will be returned as an object, so use toString()
    const isOwner = publication.author == req.user?._id //optional chaining -> what if req.user is undefined because no user is logged int to popoulate req.user, easy with ?. which is => if there is req.user - good if req.user is undefined - return undefined (instead of executing an error due to undefined)
    const isShared = publication.usersShared?.some(id => id == req.user?._id)
    res.render('publication/details', {publication, isOwner, isShared}) //to test with empty catalog publication: []
})

router.get('/:publicationId/share', isAuth, async (req, res) => {
    await publicationService.share(req.user._id, req.params.publicationId);
    res.redirect(`/`)
})

router.get('/:publicationId/edit', isAuth, async (req, res) => {
    const publication = await publicationService.getOne(req.params.publicationId)

    res.render('publication/edit', { publication })
})

router.post('/:publicationId/edit', isAuth, async (req, res) => {
    const publicationData = req.body;

    try {
        await publicationService.edit(req.params.publicationId, publicationData)
    } catch (error) {
        const publication = publicationData
        return res.status(400).render('publication/edit', {error: getErrorMessage(error), publication})
    }

    // TODO: check if owner
    res.redirect(`/publication/${req.params.publicationId}/details`)
})

router.get('/:publicationId/delete', isAuth, async (req, res) => {
    await publicationService.delete(req.params.publicationId)
    // TODO: check if owner
    res.redirect('/publication/catalog')
})

router.get('/create', isAuth, (req, res) => {
    res.render('publication/create')
})

router.post('/create', isAuth, async (req, res) => {
    const publicationData = req.body;

    try {
        await publicationService.create(req.user._id, publicationData)
    } catch (error) {
        return res.status(400).render('publication/create', {error: getErrorMessage(error)})
    }

    res.redirect('/publication/catalog')
})


module.exports = router;