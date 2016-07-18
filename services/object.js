var Promise = require('promise');
var object = require('../database/models/object');
var objectServices = {};

objectServices.buildPrototype = function(prototype, requestJson){
    return new Promise(function(resolve, reject){

        console.log("Building object from prototype id: " + prototype._id);
        if (false) {
            return reject("cant build");
        }
        return resolve("ok");
    });
};

module.exports = objectServices;
