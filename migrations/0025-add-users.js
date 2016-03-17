var mongodb = require('mongodb');
var userModel = require("./../models/user");

exports.up = function(db, next){

    var users = db.collection('users');
    users.createIndex({
        version: 1
    });

    var json = {
        "profile": {
            "username": "testuser"
        },
        "login_methods": {
            "password": "$2a$08$E39.h5.BhrVYkeScsWffWOpLNqDjVhLx9kfmtCyLZ5CoZzLod7BS2"
        }
    };
    var newUser = new userModel(json);
    newUser.save(function (err) {
        if (err) return handleError(err);
        next();
    });
};

exports.down = function(db, next){
    db.dropCollection('users', next);
};
