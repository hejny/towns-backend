var mongoose = require('./../services/mongoose');
var is = require('./../services/validation');

/*
 Changes in this db.Schema should be applied in all object schema files!

 ObjectsPrototypesHistory
 ←
 ObjectsPrototypes
 →
 Objects
 →
 ObjectsHistory - current

 */
var historySchema = new mongoose.Schema({
    _prototypeId: {
        type: String,
        required:true,
        trim: true,
        validate: is.validObjectId
    },
    _currentId: {
        type: String,
        required:true,
        trim: true,
        validate: is.validObjectId
    },
    version: {
        type: Number,
        required: true,
        default: 0,
        validate: is.validObjectVersion
    },
    name: {
        type: String,
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
        trim: true
    },
    x: {
        type: mongoose.Schema.Types.Double,
        required: true,
        validate: is.validObjectCoordinate
    },
    y: {
        type: mongoose.Schema.Types.Double,
        required: true,
        validate: is.validObjectCoordinate
    },
    start_time: {
        type: Date,
        required: true,
        validate: is.validDate
    },
    stop_time: {
        type: Date,
        required:true,
        default: Date.now,
        validate: is.validCurrentDate
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
        data: {type: String, trim: true}
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
    collection: 'objectsHistory', 
    versionKey: "_version"
});

var objectsHistory = mongoose.model('objectsHistory', historySchema, 'objectsHistory');
module.exports = objectsHistory;