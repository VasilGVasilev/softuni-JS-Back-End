const fs = require('fs/promises');

const breedTemplate = (breed) => `
    <option value="${breed}">${breed}</option>
`;

async function renderAddCat() {
    let addBreedPageHTML = await fs.readFile('./views/addCat.html', 'utf-8');
    let breedsResult = await fs.readFile('./data/breeds.json');
    let allBreeds = JSON.parse(breedsResult); //if not parsed it will be a chunk (buffer) of stream

    const breedsPageResult = allBreeds
        .map(x => breedTemplate(x)).join('');
    const addBreedPageResult = addBreedPageHTML.replace('{{breeds}}', breedsPageResult);

    return addBreedPageResult;
}

exports.renderAddCat = renderAddCat;;