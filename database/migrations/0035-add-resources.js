var mongodb = require('mongodb');

exports.up = function(db, next){
    var resources = db.collection('resources');
    resources.createIndex({
        "version": 1,
        "owner": 1
    });
    next();
};

exports.down = function(db, next){
    db.dropCollection('resources', next);
};
