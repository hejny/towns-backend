var mongodb = require('mongodb');
var ObjectsPrototype = require('../models/objectsPrototype');

exports.up = function (db, next) {

    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.createIndex({
        type: 1,
        owner: 1
    });

    var prototypeJson = {};

    var buildingsPath = require("path").join(__dirname, "../node_modules/towns5shared/objects/buildings/main");
    require("fs").readdirSync(buildingsPath).forEach(function (file) {
        prototypeJson = require("towns5shared/objects/buildings/main/" + file);

        ObjectsPrototype.create(prototypeJson, function (err, savedProto) {
            if (err) return console.log(err);
            // saved!
        });
        // objectsPrototypes.insert([
        //     prototypeJson
        // ]);
    });

    var storiesPath = require("path").join(__dirname, "../node_modules/towns5shared/objects/stories");
    require("fs").readdirSync(storiesPath).forEach(function (file) {
        prototypesJson = require("towns5shared/objects/stories/" + file);
        for (var i; i<prototypesJson.length; ++i) {
            ObjectsPrototype.create(prototypeJson[i], function (err, savedProto) {
                if (err) return console.log(err);
                // saved!
            });
            //objectsPrototypes.insert(prototypesJson);
        }
    });

    var terrainsPath = require("path").join(__dirname, "../node_modules/towns5shared/objects/terrains");
    require("fs").readdirSync(terrainsPath).forEach(function (file) {
        prototypesJson = require("towns5shared/objects/terrains/" + file);
        for (var i; i<prototypeJson.length; ++i) {
            ObjectsPrototype.create(prototypeJson[i], function (err, savedProto) {
                if (err) return console.log(err);
                // saved!
            });
            //objectsPrototypes.insert(prototypesJson);
        }    
    });

    next();
};

exports.down = function (db, next) {
    db.dropCollection('objectsPrototypes', next);
    //var objectsPrototypes = db.collection('objectsPrototypes');
    //objectsPrototypes.findOneAndUpdate({name: 'Ambasada'}, [], {}, {remove: true}, next);
};
