'use strict';

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
    _prototypeId: { type: String, required:true },
    version: {type: Number, required: true, default: 0},
    name: {
        type: String,
        minlength: 1,
        maxlength: 64,
        trim: true,
        validate: is.alphanumeric
    },
    type: {
        type: String,
        required: true,
        validate: is.validType
    },
    subtype: {
        type: String
    },
    locale: {
        type: String,
        trim: true,
        default: "cs",
        validate: is.validLocale
    },
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    start_time: {type: Date, required: true, default: Date.now},
    design: {
        type: {type: String, default: "model"},
        data: db.Schema.Types.Mixed
    },
    content: {
        type: {type: String, default: "markdown", trim: true},
        data: String
    },
    properties: {
        strength: {type: Number},
        defense: {type: Number},
        speed: {type: Number}
    },
    actions: Array,
    owner: {type: String, required: true, default: "admin"}
});

var object = db.model('objects', schema);
module.exports = object;