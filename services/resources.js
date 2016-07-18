var Promise = require('promise');
var resources = require('../database/models/resources');
var resourcesServices = {};

resourcesServices.allocateFundsForPrototype = function() {
    return new Promise(function (resolve, reject) {

        console.log("Checking if user has enough money to build the prototype");
        if (false) {
            return reject("Not enough money for this prototype");
        }
        return resolve();
    })
};

resourcesServices.payForObject = function(object){
    return new Promise(function (resolve, reject){

        console.log("Paying for object id: " + object._id);
        if (false) {
            return reject(err);
        }
        return resolve(true);
    });
};

module.exports = resourcesServices;
