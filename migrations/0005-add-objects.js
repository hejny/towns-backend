var mongodb = require('mongodb');

exports.up = function (db, next) {

    var objects = db.collection('objects');
    objects.createIndex({
        _prototypeId: 1,
        version: 1,
        x: 1,
        y: 1,
        type: 1,
        start_time: 1,
        owner: 1
    });
    objects.insert([
        {
            "_prototypeId": "507f1f77bcf86cd799439011",
            "version": "2",
            "name": "Ambasada",
            "type": "building",
            "subtype": "",
            "x": "12.34",
            "y": "-55.05",
            "start_time": "1449572794",
            "locale": "cs",
            "design": {
                type: "model",
                data: "12,3453,654,234,..."
            },
            "content": {
                type: "markdown",
                data: "Kde bolo tam bolo"
            },
            "properties": {
                strength: "5",
                defense: "3",
                speed: "10"
            },
            "actions": ["attack", "defense", "dismantle"],
            "owner": "5126bc054aed4daf9e2ab772"
        }
    ], next);
};

exports.down = function (db, next) {
    db.dropCollection('objects', next);
    //var objects = db.collection('objects');
    //objects.findAndModify({owner: '5126bc054aed4daf9e2ab772'}, [], {}, {remove: true}, next);
};
