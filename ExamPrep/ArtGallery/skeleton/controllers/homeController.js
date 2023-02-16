const router = require('express').Router();
const publicationService = require('../services/publicationService')

router.get('/', async (req, res) => {
    const publications = await publicationService.getAll();
    publications.map(eachPublication => {
        let usersShared = eachPublication.usersShared.length
        eachPublication.noSharing = usersShared === 0 ? true : false
    })
    res.render('home', {publications})
})

module.exports = router;