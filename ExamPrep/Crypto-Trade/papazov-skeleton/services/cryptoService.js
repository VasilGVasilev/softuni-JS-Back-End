const Crypto = require('../models/Crypto')

exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId}); //destructuring to add owner to the Model

// dont forget to .lean() if not here in service so that templating engine works
exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean()