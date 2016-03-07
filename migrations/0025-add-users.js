
var mongodb = require('mongodb');

exports.up = function(db, next){

    var users = db.collection('users');
    users.createIndex({
        names: 1,
        version: 1
    });
    users.insert([
        {
            "version": "0",
            "names": {
                "username": "testuser"
            },
            "login_methods": {
                "password": "$2a$08$E39.h5.BhrVYkeScsWffWOpLNqDjVhLx9kfmtCyLZ5CoZzLod7BS2" //password is "password"
            },
            "contacts": [],
            "user_roles": [],
            "languages": "cs"
        }
    ], next);
};

exports.down = function(db, next){
    db.dropCollection('users', next);
};
