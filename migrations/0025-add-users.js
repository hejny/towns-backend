var mongodb = require('mongodb');
var userModel = require("./../models/user");
var userEvents = require('../events/user');

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
    userModel.create(json, function (err, savedUser) {
        if (err) return console.log(err);
        userEvents.hasRegistered(savedUser);
        next();
    });
};

exports.down = function(db, next){
    db.dropCollection('users', next);
};
