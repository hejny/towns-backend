var mongodb = require('mongodb');

exports.up = function (db, next) {

    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.createIndex({
        type: 1
    });
    objectsPrototypes.insert({
        "name": "Ambasada",
        "type": "building",
        "subtype": "passive",
        "locale": "cs",
        "design": {
            "type": "model",
            "data": "12,3453,654,234,..."
        },
        "content": {
            "type": "markdown",
            "data": "Kde bolo tam bolo"
        },
        "properties": {
            "strength": 5,
            "defense": 3,
            "speed": 10
        },
        "actions": ["attack", "defense", "dismantle"]
    }, next);
};

exports.down = function (db, next) {
    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.findOneAndUpdate({name:'Ambasada'}, [], {}, { remove: true }, next);
};
