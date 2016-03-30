var server = require('../../config/server');
var ResourcesModel = require('../../models/resources');

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
        //TODO: finish output/error json
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
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "resources",
                    msg: "User hasn't any resources",
                    val: ""
                }]
            });
        }
        return res.json(resource);
    });
};



module.exports = resourcesController;