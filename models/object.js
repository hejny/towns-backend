var db = require('../db');
var Object = db.model('Object', {
    x: {type: Integer, required: true},
    y: {type: Integer, required: true},
    objectType: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()}
});
module.exports = Post;