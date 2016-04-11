var server = require('../../config/server');
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