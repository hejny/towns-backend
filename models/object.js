var db = require('./db');
var is = require('./validation');

/*
Changes in this db.Schema should be applied in all object schema files!

ObjectsPrototypesHistory
←
ObjectsPrototypes
→
Objects - current
→
ObjectsHistory

*/
var schema = new db.Schema({
    _prototypeId: {
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
        type: db.Schema.Types.Double,
        required: true,
        validate: is.validObjectCoordinate
    },
    y: {
        type: db.Schema.Types.Double,
        required: true,
        validate: is.validObjectCoordinate
    },
    start_time: {
        type: Date,
        required: true,
        default: Date.now,
        validate: is.validDate
    },
    locale: {
        type: String,
        trim: true,
        default: "cs",
        validate: is.validObjectLocale
    },
    design: {
        type: {type: String, default: "model", trim: true},
        data: db.Schema.Types.Mixed
        /*{//[PH] This is specification for only one type of data - model. In future there will be other types with different specifications.
            particles: Array,
            rotation: {type: Number, default: 0},
            size: {type: Number, default: 1}
        }*/
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
        default: "admin",
        validate: is.validOwnerId
    }
});

var object = db.model('objects', schema);
module.exports = object;