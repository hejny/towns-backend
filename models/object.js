var db = require('./db');

var schema = new db.Schema({
    version: {type: Number, required: true, default: 1},
    name: String,
    type: {type: String},
    subtype: String,
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    start_time: {type: Date, required: true, default: Date.now},
    locale: {type: String, default: "cs"},
    design: {
        type: {type: String},
        data: {type: String}
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