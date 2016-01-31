'use strict';

var db = require('./db');
var is = require('./validation');


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
var prototypeSchema = new db.Schema({
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
        validate: is.validObjectType
    },
    subtype: {
        type: String
    },
    locale: {
        type: String,
        trim: true,
        default: "cs",
        validate: is.validObjectLocale
    },
    design: {
        type: {type: String, default: "model"},
        data: db.Schema.Types.Mixed
    },
    content: {
        type: {type: String, default: "markdown"},
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
        default: "admin",
        validate: is.validOwnerId
    }
}, {
    collection: 'objectsPrototypes'
});

var objectsPrototype = db.model('objectsPrototypes', prototypeSchema, 'objectsPrototypes');
module.exports = objectsPrototype;