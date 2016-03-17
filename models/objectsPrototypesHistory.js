
var db = require('./services/db');
var is = require('./services/validation');

/*
 Changes in this db.Schema should be applied in all object schema files!

 ObjectsPrototypesHistory - current
 ←
 ObjectsPrototypes
 →
 Objects
 →
 ObjectsHistory

 */
var prototypesHistorySchema = new db.Schema({
    _prototypeId: {
        type: String,
        required:true,
        trim: true,
        validate: is.validObjectId
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
    locale: {
        type: String,
        trim: true,
        default: "cs",
        lowercase: true,
        validate: is.validLocale
    },
    design: {
        type: {type: String, default: "model", trim: true},
        data: db.Schema.Types.Mixed
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
        default: "admin",
        validate: is.validOwnerId
    }
}, {
    collection: 'objectsPrototypesHistory'
});

var objectsPrototypesHistory = db.model('objectsPrototypesHistory', prototypesHistorySchema, 'objectsPrototypesHistory');
module.exports = objectsPrototypesHistory;