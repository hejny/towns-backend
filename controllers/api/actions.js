var server = require('../../config/server');
var shared = require('../../node_modules/towns5shared/build/towns-shared');
var Promise = require('promise');
// var ResourcesModel = require('../../models/resources');
// var userEvents = require('../../events/user');

/**
 * Controller for handling resources
 * @type {{}}
 */
var actionsController = {};

/**
 * Returns user with given _id
 * @param req
 * @param res
 */
actionsController.build = function (req, res) {

    //var owner = req.user.profile.username;
    var owner = "Otto, the Builder";
    var id = "5732178e7623e64f21d567cfc";
    console.log("starting");

    function getPrototype(id){
        return new Promise(function(resolve, reject) {

            console.log("processing");
            ObjectsPrototype.findOne({"_id": id}, function (err, prototype) {
                if (err) {
                    return reject(err);
                }
                if (prototype === null) {
                    return reject("There is no such prototype");
                }
                return resolve.json(prototype);

            });
        });
    }

    function buildPrototype(prototype){
        return new Promise(function(resolve, reject){

            // check if owner has enough resources to build prototype
            // build the object
            // deduct the resources
            // return built object

            //console.log(prototype);
            console.log("Building object from prototype id: " );
            if (false) {
                return reject(err);
            }
            return resolve.json("ok");
        });
    }

    getPrototype(id).then(buildPrototype(res));

    
    return res.status(200).json({
        "status": "ok",
        "message": [{
            param: "build",
            msg: owner+" is building something",
            val: ""
        }]
    });
};



module.exports = actionsController;