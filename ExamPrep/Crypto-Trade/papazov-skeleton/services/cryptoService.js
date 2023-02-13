const Crypto = require('../models/Crypto')

exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId}); //destructuring to add owner to the Model

// dont forget to .lean() later
exports.getAll = () => Crypto.find({})