const fs = require('fs/promises');

async function updateBreed(addedBreed){
    let breedsResult = await fs.readFile('./data/breeds.json');
    let allBreeds = JSON.parse(breedsResult); //if not parsed it will be a chunk (buffer) of stream
    let newArr = [...allBreeds]
    
    newArr.push(addedBreed);
    await fs.writeFile('./data/breeds.json', JSON.stringify(newArr));
}

module.exports = updateBreed;