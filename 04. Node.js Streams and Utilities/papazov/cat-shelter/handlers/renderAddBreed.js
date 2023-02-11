const fs = require('fs/promises');

async function renderAddBreed() {
    let addBreedPageHTML = await fs.readFile('./views/addBreed.html', 'utf-8');
    return addBreedPageHTML;
}

exports.renderAddBreed = renderAddBreed;
