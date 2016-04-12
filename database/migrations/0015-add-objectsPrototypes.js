var mongodb = require('mongodb');
var ObjectsPrototype = require('../models/objectsPrototype');
var UserModel = require('../models/user');

// seeds
var buildings = require('../seeds/basicBuildings');
var stories = require('../seeds/initialStories');
var terrains = require('../seeds/initialTerrains');

exports.up = function (db, next) {

    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.createIndex({
        type: 1,
        owner: 1
    });

    UserModel.findOne({"profile.username": "admin"}, function (err, user) {

        var reportError = function (err, savedProto) {
            if (err) return console.log(err);
             // console.log(savedProto);
        };

        buildings.forEach(function (building) {
            building.owner = user._id;
            ObjectsPrototype.create(building, reportError);
        });

        stories.forEach(function (story) {
            story.owner = user._id;
            ObjectsPrototype.create(story, reportError);
        });

        
        terrains.forEach(function (terrain) {
            terrain.owner = user._id;
            ObjectsPrototype.create(terrain, reportError);
        });

        next();
    });

};

exports.down = function (db, next) {
    db.dropCollection('objectsPrototypes', next);
    //var objectsPrototypes = db.collection('objectsPrototypes');
    //objectsPrototypes.findOneAndUpdate({name: 'Ambasada'}, [], {}, {remove: true}, next);
};
