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
        // unique is a special validator that has also optimised searching based on indices
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ]
});

// description uses in-build max-length validation
// imageUrl uses more complex validation 
cubeSchema.path('imageUrl').validate(function() {
    return this.imageUrl.startsWith('http');
}, 'Image url should be a link');

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
