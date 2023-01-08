const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();
// {$nin: ids} is an operator  -> Matches none of the values specified in an array.
// give me Id that are not part of the ids that are given as a param
exports.getAllAvailable = (ids) => Accessory.find({_id: {$nin: ids}});

exports.create = (accessoryData) => Accessory.create(accessoryData);