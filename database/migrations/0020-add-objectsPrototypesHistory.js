var mongodb = require('mongodb');

exports.up = function(db, next){
    var objectsPrototypesHistory = db.collection('objectsPrototypesHistory');
    objectsPrototypesHistory.createIndex({
        type: 1,
        _currentId: 1,
        _prototypeId: 1,
        owner: 1
    });
    next();
};

exports.down = function(db, next){
    db.dropCollection('objectsPrototypesHistory', next);};
