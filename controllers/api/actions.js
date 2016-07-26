var server = require('../../config/server');
var shared = require('../../node_modules/towns5shared/build/towns-shared');
var objectsPrototype = require('../../services/objectsPrototype');
var resources = require('../../services/resources');
var object =  require('../../services/object');
// var ResourcesModel = require('../../models/resources');
// var userEvents = require('../../events/user');

/**
 * Controller for handling resources
 * @type {{}}
 */
var actionsController = {};

/**
 * Returns user with given _id
 * @param request
 * @param response
 */
actionsController.build = function (request, response) {

    //var owner = req.user.profile.username;
    var owner = "Otto, the Builder";
    var prototypeId = request.body.prototypeId;

    objectsPrototype.findOne(prototypeId)
        .then(function(prototype) {
            return resources.allocateFundsForPrototype(prototype);
        })
        .then(function(prototype) {
            return object.buildPrototype(prototype, request)
        })
        .then(function(object) {
            return resources.payForObject(object)
        })
        .then(function (object) {

            return response.status(200).json({
                "status": "ok",
                "message": [{
                    param: "build",
                    msg: owner+" is building something",
                    val: object?object:""
                }]
            });

        })
        .catch(function(err) {
            console.log(err);
        });

};



module.exports = actionsController;