const User = require('../models/User')
const Housing = require('../models/Housing')

exports.create = async (ownerId, housingData) => {
    let housing = await Housing.create({...housingData, owner: ownerId}); //destructuring to add owner to the Model    

}
exports.getLastThree =  async () => await Housing.find({}).sort({ _id: -1 }).limit(3).lean()



// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Housing.find({}).lean();


// exports.getAllWished = async (userId) => {
//     const housings = await Housing.find().lean();
    // console.log(housings.map(housing => housing.wishingList.toString()))
//     // const wishedHousings = housings.map(housing => housing.wishingList.some(wishedHousing => Housing.toString() == userId));
//     // console.log(wishedHousings)
//     return wishedhousings

// }

// exports.search = async (email) => {
//     let housing = await this.getAll();
//     // in-memory filtration
//     if (email) {
//         housing = housing.filter(x => x.email.toLowerCase() == email);
//     }
//     return housing
// }


exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants').lean()

// exports.getAllCandidates = () => Housing.find({}).lean();


// easier but two requests!
exports.rent = async (userId, housingId) => {
    const housing = await Housing.findByIdAndUpdate(housingId, {$push:{tenants: userId}}) //20:35 mongoDB way
    let currentAvailables = housing.availablePieces
    currentAvailables = currentAvailables - 1;
    housing.availablePieces = currentAvailables;
    return housing.save()
}


// expert
// exports.wish = async (userId, housingid) => {
//     await housing.findByIdAndUpdate(housingid, {$push:{wishingList:userId}}) //20:35 mongoDB way
// }

// findByIdAndUpdate is smart and updates only edited info
exports.edit = (housingId, housingData) => Housing.findByIdAndUpdate(housingId, housingData, {runValidators: true}) //validation works on edit view too

exports.delete = (housingId) => Housing.findByIdAndDelete(housingId)
