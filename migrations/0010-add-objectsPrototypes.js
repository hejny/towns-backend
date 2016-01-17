var mongodb = require('mongodb');

exports.up = function (db, next) {

    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.createIndex({
        type: 1,
        owner: 1
    });

    objectsPrototypes.insert([
        {
            "type": "terrain",
            "design": {
                "type": "terrain",
                "data": 0
            },
            "owner": "5126bc054aed4daf9e2ab772"
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
            "actions": ["attack", "defense", "dismantle"],
            "owner": "5126bc054aed4daf9e2ab772"
        }, {
            "name": "Příběh",
            "type": "story",
            "locale": "cs",
            "content": {
                "type": "markdown",
                "data": "Kde bolo tam bolo"
            },
            "owner": "5126bc054aed4daf9e2ab772"
        }
    ], next);

};

exports.down = function (db, next) {
    db.dropCollection('objectsPrototypes', next);
    //var objectsPrototypes = db.collection('objectsPrototypes');
    //objectsPrototypes.findOneAndUpdate({name: 'Ambasada'}, [], {}, {remove: true}, next);
};
