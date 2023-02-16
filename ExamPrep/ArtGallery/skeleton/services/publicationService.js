const User = require('../models/User')
const Publication = require('../models/Publication')

exports.create = async (authorId, publicationData) => {
    let publication = await Publication.create({...publicationData, author: authorId}); //destructuring to add owner to the Model
    await User.findByIdAndUpdate(authorId, {$push:{myPublications:publication._id}}) //20:35 mongoDB way
    
}


// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Publication.find({}).lean();

exports.myPublications = async (userId) => {
    return User.findById(userId).populate('myPublications');
}

exports.sharedPublications = () => {
    return Publication.findById(userId).populate('myPublications');
}

// exports.getAllWished = async (userId) => {
//     const publications = await Publication.find().lean();
    // console.log(publications.map(publication => publication.wishingList.toString()))
//     // const wishedpublications = publications.map(publication => publication.wishingList.some(wishedpublication => Publication.toString() == userId));
//     // console.log(wishedpublications)
//     return wishedpublications

// }

// exports.search = async (email) => {
//     let publication = await this.getAll();
//     // in-memory filtration
//     if (email) {
//         publication = publication.filter(x => x.email.toLowerCase() == email);
//     }
//     return publication
// }


exports.getOne = (publicationId) => Publication.findById(publicationId).lean()

exports.getAuthor = (userId) => User.findById(userId).lean()
// exports.getAllCandidates = () => Publication.find({}).lean();


// easier but two requests!
exports.share = async (userId, publicationId) => {
    const publication = await Publication.findById(publicationId);
    // TODO: check if user has already bought the publication
    publication.usersShared.push(userId);
    return publication.save();

}


// expert
// exports.wish = async (userId, publicationid) => {
//     await publication.findByIdAndUpdate(publicationid, {$push:{wishingList:userId}}) //20:35 mongoDB way
// }

// findByIdAndUpdate is smart and updates only edited info
exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, {runValidators: true}) //validation works on edit view too

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId)
