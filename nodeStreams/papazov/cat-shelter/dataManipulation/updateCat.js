const fs = require('fs/promises');

async function updateCat(parameters, catIdEdited){
    // NB breed is dynamically rendered and cannot be selected because there is no vanilla way to pass in the reference from one template into another
    // get all cats in DB
    console.log(parameters);
    let catsResult = await fs.readFile('./data/cats.json');
    let allBreeds = JSON.parse(catsResult); //if not parsed it will be a chunk (buffer) of stream
    let catsArray = [...allBreeds]

    // create POST form to DB

    let indexOfCat = catIdEdited - 1;

    // catsArray.splice(indexOfCat, 1, {
    //     id: catIdEdited,
    //     name: fields.name,
    //     description: fields.description,
    //     imageUrl: fields.imageUrl,
    //     breed: fields.breed
    // });
        // await fs.writeFile('./data/cats.json', JSON.stringify(catsArray));


    
    // update speicifc cat in DB with new form data
    let indexOfEditedCat = allBreeds.filter(x=>x.id == catIdEdited);
    
}

module.exports = updateCat;