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

router.get('/profile', async (req, res) => {
    const myPublications = await publicationService.myPublications(req.user._id);
    const allMyPubs = myPublications.myPublications.map(x=>x.title)

    const sharedPublications = await publicationService.sharedPublications(req.user._id);
    const allSharedPubs = sharedPublications.myPublications.map(x=>x.title)
    res.render('home/profile', {allMyPubs})
})

module.exports = router;