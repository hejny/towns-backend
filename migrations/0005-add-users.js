var mongodb = require('mongodb');
var userModel = require("./../models/user");
var userEvents = require('../events/user');

exports.up = function(db, next){

    var users = db.collection('users');
    users.createIndex({
        version: 1
    });

    var jsons = {
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
    
    var json2 = {
        "profile": {
            "username": "admin"
        },
        "login_methods": {
            "password": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.F7C0NLiX-s7VN0UL0ZGT6-6NsEFi_ory8UM5uxob804"
        }
    };
    //TODO: finsh adding admin and then migrations owner
};

exports.down = function(db, next){
    db.dropCollection('users', next);
};
