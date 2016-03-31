var server = require('../../config/server');
var ResourcesModel = require('../../models/resources');
var userEvents = require('../../events/user');

/**
 * Controller for handling resources
 * @type {{}}
 */
var resourcesController = {};

/**
 * Returns user with given _id
 * @param req
 * @param res
 */
resourcesController.getResources = function (req, res) {
    ResourcesModel.findOne({'owner': req.user._id}).sort({"version": -1}).exec( function (err, resource) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": [{
                    param: "resources",
                    msg: "Problem getting resources",
                    val: ""
                }]
            });
        }

        if (!resource) {
            userEvents.addInitialResources(req.user, function(err, savedResource) {
                return res.status(200).json({
                    "status": "ok",
                    "balance_at": savedResource.created_at,
                    "resources":
                    {
                        "clay": savedResource.resources.clay,
                        "wood": savedResource.resources.wood,
                        "stone": savedResource.resources.stone,
                        "iron": savedResource.resources.iron
                    }
                });
            });
        } else {
            return res.status(200).json({
                "status": "ok",
                "balance_at": resource.created_at,
                "resources":
                {
                    "clay": resource.resources.clay,
                    "wood": resource.resources.wood,
                    "stone": resource.resources.stone,
                    "iron": resource.resources.iron
                }
            });   
        }
        
    });
};



module.exports = resourcesController;