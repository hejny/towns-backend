var server = require('../../config/server');
var shared = require('../../node_modules/towns5shared/build/towns-shared');
var Promise = require('promise');
var objectsPrototype = require('../../services/objectsPrototype');
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
    var id = "5732178e7623e64f21d567d5";

    objectsPrototype.findOne(id)
        .then(function(prototype) {
            object.buildPrototype(prototype)
        })
        .catch(function(res) {
            console.log(res);
        });

    
    return response.status(200).json({
        "status": "ok",
        "message": [{
            param: "build",
            msg: owner+" is building something",
            val: ""
        }]
    });
};



module.exports = actionsController;