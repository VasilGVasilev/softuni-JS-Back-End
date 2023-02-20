const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')
const photoService = require('../services/photoServices')
const { getErrorMessage } = require('../utils/errorUtils')

// isAuth is for security requirements
// If necessary lean!!
router.get('/catalog', async (req, res) => {
    const photo = await photoService.getAll();
    res.render('photo/catalog', {photo}) //to test with empty catalog photo: [], hbs takes priority over default JS empty array [] === true
})


router.get('/:photoId/details', async (req, res) => {
    const photo = await photoService.getOne(req.params.photoId);
    
    //view data so no problem to be acquired here in controller
    // const isOwner = photo.owner.toString() === req.user?._id // photo.owner will be returned as an object, so use toString()
    const isOwner = photo.owner._id == req.user?._id //optional chaining -> what if req.user is undefined because no user is logged int to popoulate req.user, easy with ?. which is => if there is req.user - good if req.user is undefined - return undefined (instead of executing an error due to undefined)
    const notOwner = !isOwner;
    const isWished = photo.wishingList?.some(id => id == req.user?._id)
    res.render('photo/details', {photo, isOwner, isWished, notOwner}) //to test with empty catalog photo: []
})

router.post('/:photoId/commented', async (req, res) => {
    const {comment} = req.body;
    const id = req.params.photoId;

    try {
        await photoService.comment(req.params.photoId, req.user._id, comment)
    } catch (error) {
        return res.status(400).render('photo/details')
    }

    res.redirect(`/photo/${req.params.photoId}/details`)
})

// router.post('/:photoId/commented', isAuth, async (req, res) => {
//     await photoService.wish(req.user._id, req.params.photoId);
//     res.redirect(`/photo/${req.params.photoId}/details`)
// })

router.get('/:photoId/edit', isAuth, async (req, res) => {
    const photo = await photoService.getOne(req.params.photoId)

    res.render('photo/edit', { photo })
})

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const photoData = req.body;

    try {
        await photoService.edit(req.params.photoId, photoData)
    } catch (error) {
        const photo = photoData
        return res.status(400).render('photo/edit', {error: getErrorMessage(error), photo})
    }

    // TODO: check if owner
    res.redirect(`/photo/${req.params.photoId}/details`)
})

router.get('/:photoId/delete', isAuth, async (req, res) => {
    await photoService.delete(req.params.photoId)
    // TODO: check if owner
    res.redirect('/photo/catalog')
})

router.get('/create', isAuth, (req, res) => {
    res.render('photo/create')
})

router.post('/create', isAuth, async (req, res) => {
    const photoData = req.body;

    try {
        await photoService.create(req.user._id, photoData)
    } catch (error) {
        return res.status(400).render('photo/create', {error: getErrorMessage(error)})
    }

    res.redirect('/photo/catalog')
})


module.exports = router;