const { isAuth } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService')

const router = require('express').Router();

router.get('/profile', isAuth, async (req, res) => {
    const books = await bookService.getAllWished(req.user._id)
    res.render('profile/profile', {books})
})

module.exports = router;