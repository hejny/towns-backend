var Promise = require('promise');
var resources = require('../database/models/resources');
var resourcesServices = {};
//var T = require('towns5shared/build/towns-shared.js');

resourcesServices.allocateFundsForPrototype = function(prototype) {
    return new Promise(function (resolve, reject) {
        console.log("Checking if user has enough money to build the prototype");



        try {
            //var price_bases = T.World.game.getObjectPriceBases(prototype);
            //var max_life = T.World.game.getObjectMaxLife(prototype);
            //var prices = T.World.game.getObjectPrices(prototype);
            //var price = T.World.game.getObjectPrice(prototype);
            // var design_price = T.World.game.getObjectDesignPrice(prototype);
            //TODO: the getObjectPrice method requires prototype design, Errors out due to missing design.
        }
        catch(err) {
            console.log(err.message);
        }
        console.log("Max life: " + max_life);






        if (false) {
            reject("Not enough money for this prototype");
        }
        resolve(prototype);
    })
};

resourcesServices.payForObject = function(object){
    return new Promise(function (resolve, reject){

        console.log("Paying for object id: " + object._id);
        if (false) {
            reject(err);
        }
        resolve(true);
    });
};

module.exports = resourcesServices;
