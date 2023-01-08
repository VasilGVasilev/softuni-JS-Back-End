const fs = require('fs/promises');
const { default: mongoose } = require('mongoose');
const path = require('path');
const Accessory = require('../models/Accessory');

const Cube = require('../models/Cube');

exports.getAll = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    // let cubes = await Cube.find(
    //     { 
    //         name: { $regex: new RegExp(search, 'i') },
    //         difficultyLevel: { $and: [{ $gte: from }, { $lte: to }] } 
    //     },
    // ).lean();
    
    // find in DB and return 
    let cubes = await Cube.find({name: { $regex: new RegExp(search, 'i') }})
        .where('difficultyLevel').lte(to).gte(from)
        .lean();

    return cubes;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

// NB in order for Cube to have accessories array when displaying, thus, it is necessary not only to set the ref in the Schema
exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');

// without .populate() ->
// >> accessories field as an object with ObjectId
// with .populate()
// >> accessroies field has the fields of that particluar object, in this case the accessory's name, description, imageUrl

// Deep populate
// Nested population
// .populate({
//     path: 'accessories',
//     populate: {
//         path: 'cubes',
//         model: 'Cube'
//     }
// });

exports.create = (cube) => Cube.create(cube);

// how Accessory is attached to Cube
exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    // const cubeObjectId = mongoose.Types.ObjectId(cubeId);

    // adding relations by simlpy pushing into array
    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
}