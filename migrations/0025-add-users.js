
var mongodb = require('mongodb');

exports.up = function(db, next){

    var users = db.collection('users');
    users.createIndex({
        version: 1
    });
    users.insert([
        {
            "version": 0,
            "names": {
                "username": "testuser",
                "name": "",
                "surname": "",
                "email": ""
            },
            "login_methods": {
                "password": "$2a$08$E39.h5.BhrVYkeScsWffWOpLNqDjVhLx9kfmtCyLZ5CoZzLod7BS2",
                "google": "",
                "facebook": "",
                "twitter": ""
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
