var Promise = require('promise');
var object = require('../database/models/object');
var objectServices = {};

objectServices.buildPrototype = function(prototype){
    return new Promise(function(resolve, reject){

        // check if owner has enough resources to build prototype
        // build the object
        // deduct the resources
        // return built object

        console.log("Building object from prototype id: " + prototype._id);
        if (false) {
            return reject(err);
        }
        return resolve.json("ok");
    });
};

module.exports = objectServices;
