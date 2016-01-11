var mongodb = require('mongodb');

exports.up = function (db, next) {

    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.createIndex({
        type: 1
    });

    objectsPrototypes.insert([
        {
            "type": "terrain",
            "design": {
                "type": "terrain",
                "data": 0
            }
        }, {
            "name": "Ambasada",
            "type": "building",
            "subtype": "main",
            "locale": "cs",
            "design": {
                "type": "model",
                "data": {}
            },
            "properties": {
                "strength": 5,
                "defense": 3,
                "speed": 10
            },
            "actions": ["attack", "defense", "dismantle"]
        }, {
            "name": "Příběh",
            "type": "story",
            "locale": "cs",
            "content": {
                "type": "markdown",
                "data": "Kde bolo tam bolo"
            }
        }
    ], next);

};

exports.down = function (db, next) {
    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.findOneAndUpdate({name: 'Ambasada'}, [], {}, {remove: true}, next);
};
