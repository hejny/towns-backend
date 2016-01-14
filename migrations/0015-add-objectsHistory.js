
var mongodb = require('mongodb');

exports.up = function(db, next){

    var objectsHistory = db.collection('objectsHistory');
    objectsHistory.createIndex({
        type: 1,
        _currentId: 1,
        _prototypeId: 1,
        x: 1,
        y: 1,
        owner: 1
    });

    objectsHistory.insert([
        {
            "_currentId": "507f1f77bcf86cd799439011",
            "_prototypeId": "507f1f77bcf86cd799439011",
            "version": "1",
            "name": "Die ambasadasen",
            "type": "building",
            "subtype": "",
            "x": "0.00",
            "y": "0.00",
            "start_time": "1449572791",
            "stop_time": "1449572794",
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

exports.down = function(db, next){
    var objectsHistory = db.collection('objectsHistory');
    objectsHistory.findOneAndUpdate({owner: '5126bc054aed4daf9e2ab772'}, [], {}, {remove: true}, next);
};
