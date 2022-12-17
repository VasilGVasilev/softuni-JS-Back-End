const fs = require('fs/promises')

async function postCat(param){
    let name = param.shift().split('=').pop();
    let description = param.shift().split('=').pop();
    let upload = param.shift().split('=').pop();
    let breed = param.shift().split('=').pop().split('+').join(' ');
    
    // added cats overwrite the DB so persist after server is stopped
    let streamCats = await fs.readFile('./data/cats.json');
    let currentCats = JSON.parse(streamCats);
    let id = currentCats.length + 1;
    currentCats.push({
        id,
        name,
        description,
        upload,
        breed
    })

    await fs.writeFile('./data/cats.json', JSON.stringify(currentCats));
}
module.exports = postCat