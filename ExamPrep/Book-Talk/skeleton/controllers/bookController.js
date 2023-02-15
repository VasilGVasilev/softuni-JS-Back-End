const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware')
const bookService = require('../services/bookService')
const { getErrorMessage } = require('../utils/errorUtils')

// isAuth is for security requirements
// If necessary lean!!
router.get('/catalog', async (req, res) => {
    const book = await bookService.getAll();
    res.render('book/catalog', {book}) //to test with empty catalog book: [], hbs takes priority over default JS empty array [] === true
})


router.get('/:bookId/details', async (req, res) => {
    const book = await bookService.getOne(req.params.bookId);
    //view data so no problem to be acquired here in controller
    // const isOwner = book.owner.toString() === req.user?._id // book.owner will be returned as an object, so use toString()
    const isOwner = book.owner == req.user?._id //optional chaining -> what if req.user is undefined because no user is logged int to popoulate req.user, easy with ?. which is => if there is req.user - good if req.user is undefined - return undefined (instead of executing an error due to undefined)
    const isWished = book.wishingList?.some(id => id == req.user?._id)
    res.render('book/details', {book, isOwner, isWished}) //to test with empty catalog book: []
})

router.get('/:bookId/onWishList', isAuth, async (req, res) => {
    await bookService.wish(req.user._id, req.params.bookId);
    res.redirect(`/book/${req.params.bookId}/details`)
})

router.get('/:bookId/edit', isAuth, async (req, res) => {
    const book = await bookService.getOne(req.params.bookId)

    res.render('book/edit', { book })
})

router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookData = req.body;

    try {
        await bookService.edit(req.params.bookId, bookData)
    } catch (error) {
        const book = bookData
        return res.status(400).render('book/edit', {error: getErrorMessage(error), book})
    }

    // TODO: check if owner
    res.redirect(`/book/${req.params.bookId}/details`)
})

router.get('/:bookId/delete', isAuth, async (req, res) => {
    await bookService.delete(req.params.bookId)
    // TODO: check if owner
    res.redirect('/book/catalog')
})

router.get('/create', isAuth, (req, res) => {
    res.render('book/create')
})

router.post('/create', isAuth, async (req, res) => {
    const bookData = req.body;

    try {
        await bookService.create(req.user._id, bookData)
    } catch (error) {
        return res.status(400).render('book/create', {error: getErrorMessage(error)})
    }

    res.redirect('/book/catalog')
})


module.exports = router;