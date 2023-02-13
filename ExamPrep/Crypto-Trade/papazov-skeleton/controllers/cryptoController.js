const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')
const cryptoService = require('../services/cryptoService')
const { getErrorMessage } = require('../utils/errorUtils')
const { paymentMethodsMap } = require('../constants')

// isAuth is for security requirements
// If necessary lean!!
router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();
    res.render('crypto/catalog', {crypto}) //to test with empty catalog crypto: [], hbs takes priority over default JS empty array [] === true
})

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    //view data so no problem to be acquired here in controller
    // const isOwner = crypto.owner.toString() === req.user?._id // crypto.owner will be returned as an object, so use toString()
    const isOwner = crypto.owner == req.user?._id //optional chaining -> what if req.user is undefined because no user is logged int to popoulate req.user, easy with ?. which is => if there is req.user - good if req.user is undefined - return undefined (instead of executing an error due to undefined)
    const isBuyer = crypto.buyers?.some(id => id == req.user?._id)
    res.render('crypto/details', {crypto, isOwner, isBuyer}) //to test with empty catalog crypto: []
})

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);
    res.redirect(`/crypto/${req.params.cryptoId}/details`)
})

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId)

    // mapping for options/select in view
    // key is so that you can access the value via [key] but contextually, it keys are the values, thus, crypto.paymentMethod (selected in DB) ?== key (current mapping value)
    const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
        value: key, 
        label: paymentMethodsMap[key],
        isSelected: crypto.paymentMethod == key
    }))

    res.render('crypto/edit', { crypto, paymentMethods })
})

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoData = req.body;

    const crypto = await cryptoService.edit(req.params.cryptoId, cryptoData)

    // TODO: check if owner
    res.redirect(`/crypto/${req.params.cryptoId}/details`)
})

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    await cryptoService.delete(req.params.cryptoId)
    // TODO: check if owner
    res.redirect('/crypto/catalog')
})

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create')
})

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoService.create(req.user._id, cryptoData)
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)})
    }

    res.redirect('/crypto/catalog')
})


module.exports = router;