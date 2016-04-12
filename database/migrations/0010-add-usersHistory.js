var mongodb = require('mongodb');

exports.up = function(db, next){
    var users = db.collection('usersHistory');
    users.createIndex({
        version: 1,
        _current_id: 1
    }, next);

};

exports.down = function(db, next){
    db.dropCollection('usersHistory', next);
};
