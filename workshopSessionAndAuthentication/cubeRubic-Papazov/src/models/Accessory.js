const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // see Accessory model for built-in validator 
    imageUrl: {
        type: String,
        required: true,
        validate: {
            // validator: /^https?/g,
            validator: function() {
                return this.imageUrl.startsWith('http');
            },
            message: 'Image url should be a link'
        },
    },
    description: {
        type: String,
        maxLength: 120,
        required: true,
    },
    cubes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cube'
        }
    ]
    // special field in document denoting the relation
    // if it is an array, it is many to many, if it one object its obvious that only one relation is possible
    // the 'type' has to be set to be OBJECT>ID
    // the 'ref' has to be set to the relevant model 
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
