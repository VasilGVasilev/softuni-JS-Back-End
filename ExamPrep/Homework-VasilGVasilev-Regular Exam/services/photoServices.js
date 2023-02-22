const Photo = require('../models/Photo')

exports.create = (ownerId, photoData) => Photo.create({...photoData, owner: ownerId}); //destructuring to add owner to the Model

// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Photo.find({}).lean().populate('owner');

exports.getAllWished = async (userId) => {
    const photos = await Photo.find().lean();
    // console.log(photos.map(photo => photo.wishingList.toString()))
    const wishedPhotos = photos.map(photo => photo.wishingList.some(wishedPhoto => wishedPhoto.toString() == userId));
    // console.log(wishedphotos)
    return wishedPhotos

}

// (userId) => Photo.find({wishingList: {}});

exports.getOne = (photoId) => Photo.findById(photoId).lean().populate('owner')

// easier but two requests!
// exports.wish = async (userId, photoId) => {
//     const photo = await Photo.findById(photoId);
//     // TODO: check if user has already bought the photo
//     photo.wishingList.push(userId);
//     return photo.save();

// }

// expert

exports.comment = async (photoId, user, commentName) => {
    const photo = await Photo.findById(photoId);
    // TODO: check if user has already bought the publication
    const commentAndUser = {userId: user, comment: commentName}
    photo.commentList.push(commentAndUser);
    return photo.save();

}


// findByIdAndUpdate is smart and updates only edited info
exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData, {runValidators: true}) //validation works on edit view too

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId)
