var db = require('./db');


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
var historySchema = new db.Schema({
    _prototypeId: { type: String, required:true },
    _currentId: { type: String, required:true },
    version: {type: Number, required: true, default: 1},
    name: String,
    type: {type: String},
    subtype: String,
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    start_time: {type: Date, required: true},
    stop_time: {type: Date, required:true, default: Date.now},
    locale: {type: String, default: "cs"},
    design: {
        type: {type: String, default: "model"},
        data: db.Schema.Types.Mixed
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
}, {
    collection: 'objectsHistory'
});

var objectsHistory = db.model('objectsHistory', historySchema, 'objectsHistory');
module.exports = objectsHistory;