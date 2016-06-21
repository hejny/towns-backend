var server = require('../../config/server');
var shared = require('../../node_modules/towns5shared/build/towns-shared');
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

    var owner = req.user.profile.username;

    // get the prototype

    // check if owner has enough resources to build prototype
        // build the object
        // deduct the resources
        // return built object
    // otherwise
        // return error
    
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