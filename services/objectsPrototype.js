var Promise = require('promise');
var objectsPrototype = require('../database/models/objectsPrototype');
var objectsPrototypeServices = {};

objectsPrototypeServices.findOne = function (id) {
    return new Promise(function (resolve, reject) {

        console.log("finding prototype: " + id);
        objectsPrototype.findOne({"_id": id}, function (err, prototype) {
            if (err) {
                return reject("Problem getting your prototype");
            }
            if (prototype === null) {
                return reject("There is no such prototype");
            }
            //console.log(prototype);
            return resolve(prototype);

        });
    });
};

module.exports = objectsPrototypeServices;