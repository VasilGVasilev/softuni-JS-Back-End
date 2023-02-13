const Crypto = require('../models/Crypto')

exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId}); //destructuring to add owner to the Model

// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean()

// easier but two requests!
exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    // TODO: check if user has already bought the crypto
    crypto.buyers.push(userId);
    return crypto.save();

}


// expert
// exports.buy = async (userId, cryptoid) => {
//     Crypto.findByIdAndUpdate(cryptoid, {$push:{buyers:userId}}) //20:35 mongoDB way
// }

// findByIdAndUpdate is smart and updates only edited info
exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData)

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId)
