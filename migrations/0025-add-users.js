
var mongodb = require('mongodb');

exports.up = function(db, next){

    var users = db.collection('users');
    users.createIndex({
        version: 1
    });
    users.insert([
        {
            "profile": {
                "username": "testuser"
            },
            "login_methods": {
                "password": "$2a$08$E39.h5.BhrVYkeScsWffWOpLNqDjVhLx9kfmtCyLZ5CoZzLod7BS2"
            }
        }
    ], next);
};

exports.down = function(db, next){
    db.dropCollection('users', next);
};
