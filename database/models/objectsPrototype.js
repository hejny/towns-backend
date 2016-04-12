
var mongoose = require('./../services/mongoose');
var is = require('./../services/validation');

/*
 Changes in this db.Schema should be applied in all object schema files!

 ObjectsPrototypesHistory
 ←
 ObjectsPrototypes - current
 →
 Objects
 →
 ObjectsHistory

 */
var prototypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 64,
        trim: true,
        validate: is.validObjectName
    },
    type: {
        type: String,
        required: true,
        trim: true,
        validate: is.validObjectType
    },
    subtype: {
        type: String,
        trim: true,
        default: "",
        validate: is.validObjectSubType
    },
    locale: {
        type: String,
        trim: true,
        default: "cs",
        lowercase: true,
        validate: is.validLocale
    },
    design: {
        type: {type: String, default: "model", trim: true},
        data: mongoose.Schema.Types.Mixed
    },
    content: {
        type: {type: String, default: "markdown", trim: true},
        data: {type: String}
    },
    properties: {
        strength: {type: Number},
        defense: {type: Number},
        speed: {type: Number}
    },
    actions: Array,
    owner: {
        type: String,
        required: true,
        trim: true,
        validate: is.validOwnerId
    }
}, {
    collection: 'objectsPrototypes',
    versionKey: "_version"
});

var objectsPrototype = mongoose.model('objectsPrototypes', prototypeSchema, 'objectsPrototypes');
module.exports = objectsPrototype;