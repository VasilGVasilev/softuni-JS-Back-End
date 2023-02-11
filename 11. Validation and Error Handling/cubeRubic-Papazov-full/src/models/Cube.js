const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 120,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    } // if coming from cubeController create cube, note that the user.owner is set so that a relation for ownership of cube is possible
});

cubeSchema.path('imageUrl').validate(function() {
    return this.imageUrl.startsWith('http');
}, 'Image url should be a link');

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
