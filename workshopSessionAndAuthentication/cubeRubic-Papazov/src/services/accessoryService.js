const Accessory = require('../models/Accessory');

exports.getAll = () => Accessory.find();
// {$nin: ids} is an operator  -> Matches none of the values specified in an array.
// give me Id that are not part of the ids that are given as a param
// initially the Cube does not have any ids of accessories, you attach them and now it has one, so display all that are not,
// which is the one currently attached, then attach a second and out of three, two are in the Cube's accessories array, 
// only one left is possible for display
exports.getAllAvailable = (ids) => Accessory.find({_id: {$nin: ids}});

exports.create = (accessoryData) => Accessory.create(accessoryData);