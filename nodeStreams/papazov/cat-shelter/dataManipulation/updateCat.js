const fs = require('fs/promises');
const { IncomingForm } = require('formidable');

async function updateCat(req, res, catIdEdited){
    // NB breed is dynamically rendered and cannot be selected because there is no vanilla way to pass in the reference from one template into another
    // get all cats in DB
    let catsResult = await fs.readFile('./data/cats.json');
    let allBreeds = JSON.parse(catsResult); //if not parsed it will be a chunk (buffer) of stream
    let catsArray = [...allBreeds]

    // create POST form to DB
    const form = new IncomingForm();
    form.parse(req, async (err, fields) => {

        // find specific cat in DB -> if it is 5th, it is the object with index 4 in an array starting with 0
        // so just replace it using splice
        let indexOfCat = catIdEdited - 1;

        // set specific cat in DB
        catsArray.splice(indexOfCat, 1, {
            id: catIdEdited,
            name: fields.name,
            description: fields.description,
            imageUrl: fields.imageUrl,
            breed: fields.breed
        });
        console.log(catsArray);
        // overwrite DB
        // await fs.writeFile('./data/cats.json', JSON.stringify(catsArray));

    });


    
    // update speicifc cat in DB with new form data
    let indexOfEditedCat = allBreeds.filter(x=>x.id == catIdEdited);
    
}

module.exports = updateCat;