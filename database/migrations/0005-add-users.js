var mongodb = require('mongodb');
var userModel = require("./../models/user");
var userEvents = require('../../events/user');

exports.up = function(db, next){

    var users = db.collection('users');
    users.createIndex({
        version: 1
    });

    var testUserJson = {
        "profile": {
            "username": "testuser"
        },
        "login_methods": {
            "password": "$2a$08$E39.h5.BhrVYkeScsWffWOpLNqDjVhLx9kfmtCyLZ5CoZzLod7BS2"
        }
    };

    var adminJson = {
        "profile": {
            "username": "admin"
        },
        "login_methods": {
            "password": "$2a$10$AwJmJRnTODwmZfSUivywjegEA1u.DfekCi48EKdr8boaG/xnx6GZe"
        }
    };

    userModel.create(testUserJson, adminJson, function (err, savedTestuser, savedAdmin) {
        if (err) return console.log(err);
        userEvents.hasRegistered(savedTestuser);
        userEvents.hasRegistered(savedAdmin);
        next();
    });
};

exports.down = function(db, next){
    db.dropCollection('users', next);
};
