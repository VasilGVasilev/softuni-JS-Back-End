const fs = require('fs/promises');
const path = require('path');

const cubes = require('../db.json');

exports.getAll = (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;
    // so that you can search by search name only, thus, default values to 'disable' difficulty level
    // also have in mind that the fromInput and toInput may be undefined so tackle this too
    
    const result = cubes
        .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);
        // see 48:00 in NB

    return result;
};

exports.getOne = (cubeId) => cubes.find(x => x.id === Number(cubeId));

exports.save = (cube) => {
    cubes.push({ id: cubes[cubes.length - 1].id + 1, ...cube });

    let textData = JSON.stringify(cubes, '', 4);

    return fs.writeFile(path.resolve('src', 'db.json'), textData, { encoding: 'utf-8' })
    // remember that fs returns promise so in cubeController await
}