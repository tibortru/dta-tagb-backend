var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
// Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection.
PoiSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: '<b>Title</b> cannot be blank.'
    },
    photo: {
        type: String,
        trim: true
    },
    audio: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: '<b>Description</b> cannot be blank.'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
        required: '<b>Coordinates</b> are not selected.',
        validate: {
            validator: function(v) {
                return null != v[0] || null != v[1];
            },
            message: '<b>Coordinates</b> are not selected.'
        }
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

// Define model
// Models are fancy constructors compiled from our Schema definitions.
// Instances of these models represent documents
// which can be saved and retrieved from our database.
// All document creation and retrieval from the database
// is handled by these models.
var Poi = mongoose.model('Poi', PoiSchema);

// Export domain model
module.exports = Poi;