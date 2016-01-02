var db = require('../db');

var schema = new db.Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    objectType: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()}
});

var object = db.model('objects', schema);
module.exports = object;