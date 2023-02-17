const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')
const housingService = require('../services/housingService')
const { getErrorMessage } = require('../utils/errorUtils')

// isAuth is for security requirements
// If necessary lean!!
router.get('/catalog', async (req, res) => {
    const housings = await housingService.getAll();
    
    res.render('housing/catalog', {housings}) //to test with empty catalog housing: [], hbs takes priority over default JS empty array [] === true
})

// router.get('/search', async (req, res) => {
//     const {email} = req.query //req.query due to being a GET request
//     const housing = await housingService.search(email);
//     res.render('housing/search', {housing}) 
// })

router.get('/:housingId/details', async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId);
    // const candidates = await housingService.getAllCandidates(housing.usersApplied)
    //view data so no problem to be acquired here in controller
    // const isOwner = housing.owner.toString() === req.user?._id // housing.owner will be returned as an object, so use toString()
    const isOwner = housing.owner == req.user?._id //optional chaining -> what if req.user is undefined because no user is logged int to popoulate req.user, easy with ?. which is => if there is req.user - good if req.user is undefined - return undefined (instead of executing an error due to undefined)
    const isRented = housing.tenants?.some(tenant => tenant._id == req.user?._id)
    const rentedOut = housing.availablePieces === 0 ? true : false
    const tenants = housing.tenants.map(x=>x.name)
    res.render('housing/details', {housing, isOwner, isRented, rentedOut, tenants}) //to test with empty catalog housing: []
})

router.get('/:housingId/rent', isAuth, async (req, res) => {
    await housingService.rent(req.user._id, req.params.housingId);
    res.redirect(`/${req.params.housingId}/details`)
})

router.get('/:housingId/edit', isAuth, async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId)

    res.render('housing/edit', { housing })
})

router.post('/:housingId/edit', isAuth, async (req, res) => {
    const housingData = req.body;

    try {
        await housingService.edit(req.params.housingId, housingData)
    } catch (error) {
        const housing = housingData
        return res.status(400).render('housing/edit', {error: getErrorMessage(error), housing})
    }

    // TODO: check if owner
    res.redirect(`/housing/${req.params.housingId}/details`)
})

router.get('/:housingId/delete', isAuth, async (req, res) => {
    await housingService.delete(req.params.housingId)
    // TODO: check if owner
    res.redirect('/housing/catalog')
})

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create')
})

router.post('/create', isAuth, async (req, res) => {
    const housingData = req.body;

    try {
        await housingService.create(req.user._id, housingData)
    } catch (error) {
        return res.status(400).render('housing/create', {error: getErrorMessage(error)})
    }

    res.redirect('/housing/catalog')
})


module.exports = router;