const fs = require('fs/promises');

const breedTemplate = (breed) => `
    <option value="${breed}">${breed}</option>
`;

const editTemplate = (cat) => `
    <form method="" action="/cats-edit/${cat.id}" class="cat-form" enctype="multipart/form-data">
        <h2>Edit Cat</h2>
        <label for="name">Name</label>
        <input type="text" id="name" value="${cat.name}">
        <label for="description">Description</label>
        <textarea id="description">${cat.description}</textarea>
        <label for="image">Image</label>
        <input type="file" id="image" value="${cat.imageUrl}>
        <label for="group">Breed</label>
        <select id="group">
            {{breeds}}
        </select>
        <button type="submit">Edit Cat</button>

    </form>
`;

async function renderEdit(catId) {

    let editPageHTML = await fs.readFile('./views/editCat.html', 'utf-8');
    let breedsResult = await fs.readFile('./data/breeds.json');
    let allBreeds = JSON.parse(breedsResult); //if not parsed it will be a chunk (buffer) of stream

    const breedsPageResult = allBreeds
        .map(x => breedTemplate(x)).join('');

    const editPageHTMLBreedAdded = editPageHTML.replace('{{breeds}}', breedsPageResult);

    
    let catsResult = await fs.readFile('./data/cats.json');
    let cats = JSON.parse(catsResult);

    const editCatsPageResult = cats
        .filter(x => x.id == catId)
        .map(cat=>editTemplate(cat))

    const finalEditPageResult  = editPageHTMLBreedAdded.replace('{{editCats}}', editCatsPageResult);

    return finalEditPageResult;
}

exports.renderEdit = renderEdit;;