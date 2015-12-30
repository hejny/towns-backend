var mongodb = require('mongodb');
var mongoose = require('mongoose');

exports.up = function (db, next) {
    //
    //var schema = mongoose.Schema({ name: 'string' });
    //
    //
    //
    //var objects = mongodb.Collection(db, 'objects');
    //objects.insert(
    //    {
    //        "version": "2",
    //        "name": "Ambasada",
    //        "type": "building",
    //        "subtype": "",
    //        "x": "12.34",
    //        "y": "-55.05",
    //        "start_time": "1449572794",
    //        "stop_time": "",
    //        "locale": "cs",
    //        "design": {
    //            type: "model",
    //            data: "12,3453,654,234,..."
    //        },
    //        "content": {
    //            type: "markdown",
    //            data: "Kde bolo tam bolo"
    //        },
    //        "properties": {
    //            strength: "5",
    //            defense: "3",
    //            speed: "10"
    //        },
    //        "actions": ["attack", "defense", "dismantle"],
    //        "owner": {
    //            "$ref": "Users",
    //            "$id": ObjectId("5126bc054aed4daf9e2ab772")
    //        }
    //    }, next);
};

exports.down = function (db, next) {
    //var objects = mongodb.Collection(db, 'objects');
    //objects.findAndModify({name: 'tobi'}, [], {}, {remove: true}, next);
    next();
};
