var db = require('./db');



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
    version: {type: Number, required: true, default: 1},
    name: String,
    type: {type: String},
    subtype: String,
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    start_time: {type: Date, required: true, default: Date.now},
    locale: {type: String, default: "cs"},
    design: {
        type: {type: String, default: "model"},
        data: db.Schema.Types.Mixed
        /*{//[PH] This is specification for only one type of data - model. In future there will be other types with different specifications.
            particles: Array,
            rotation: {type: Number, default: 0},
            size: {type: Number, default: 1}
        }*/
    },
    content: {
        type: {type: String, default: "markdown"},
        data: String
    },
    properties: {
        strength: Number,
        defense: Number,
        speed: Number
    },
    actions: Array,
    owner: {type: String, required: true, default: "admin"}
});

var object = db.model('objects', schema);
module.exports = object;