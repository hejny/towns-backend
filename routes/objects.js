var express = require('express');
var router = express.Router();

var ObjectModel = require('../models/object');
var ObjectsHistory = require('../models/objectsHistory');

var objectsHandler = require('../handlers/objectsHandler');
var prototypesHandler = require('../handlers/prototypesHandler');


/**
 * GET /objects
 * return all objects
 */
router.get('/', objectsHandler.getAll);

/**
 * POST /objects
 * Create received resource
 */
router.post('/', objectsHandler.createOne);

/**
 * GET /objects/:id
 * Vypytaj len objekt s id
 */
router.get('/:id', function (req, res) {
    var parameters = req.params;
    ObjectModel.findOne({"_id": parameters.id}, function (err, object) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your object"
            });
        }

        //console.log(object);
        if (object === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There is no such object"
            });
        }

        res.json(object);
    });
});

/**
 * POST /objects/:id
 * Update object with id, according to json sent in body
 */
router.post('/:id', function (req, res) {
    var objectId = req.params.id,
        json = req.body,
        history = {};
    ObjectModel.findOne({"_id": objectId}, function (err, object) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your object"
            });
        }

        console.log(object._doc);
        if (object === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There is no such object"
            });
        }

        // create copy of current object in Objects history
        for (var key in object._doc) {
            if (object._doc.hasOwnProperty(key) && key != "_id") {
                history[key] = object._doc[key];
            }
        }

        history._currentId = object._id;
        history.stop_time = new Date();

        //console.log(history);
        var objectHistory = new ObjectsHistory(history);
        objectHistory.save(function (err) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            console.log('Version of object was succesfully saved to ObjectsHistory');
        });

        // increase version by 1 of current object & and set new start_time
        object.version++;
        object.start_time = new Date();

        // make changes on object from json
        for (key in json) {
            if (json.hasOwnProperty(key)) {
                switch (key) {
                    case "_id":
                    case "version":
                    case "start_time":
                    case "owner":
                        // do not overwrite these properties
                        break;
                    default:
                        object[key] = json[key];
                }
            }
        }

        // save the updated object to DB
        object.save(function (err, object) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            console.log(object);
            res.status(200).json({
                "status": "ok",
                "objectId": object._id,
                "version": object.version
            });
        });

    });
});

/**
 * DELETE /objects/:id
 * Vymaz objekt s danym id
 */
router.delete('/:id', function (req, res) {
    var objectId = req.params.id,
        history = {};
    // get the object
    ObjectModel.findOne({"_id": objectId}, function (err, object) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your object"
            });
        }
        //console.log(object);
        if (object === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There is no such object"
            });
        }


        // copy object to ObjectsHistory collection
        for (var key in object._doc) {
            if (object._doc.hasOwnProperty(key) && key != "_id") {
                history[key] = object._doc[key];
            }
        }
        history._currentId = object._doc._id;
        history.stop_time = new Date();
        //console.log(history);
        var objectHistory = new ObjectsHistory(history);
        objectHistory.save(function (err) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            console.log('Version of object was succesfully saved to ObjectsHistory');

            // remove it from objects collection
            object.remove();

            // return success json
            res.status(200).json({
                "status": "deleted",
                "objectId": history._currentId,
                "version": history.version
            });
        });


    });

});

/**
 * GET /objects/prototypes
 * Return all prototypes
 */
router.get('/prototypes', prototypesHandler.getAll);

/**
 * POST /objects/prototypes
 * Creates given prototype
 */
router.post('/prototypes', prototypesHandler.createOne);

/**
 * GET /objects/prototypes/:id
 * Returns requested prototype
 */
router.get('/prototypes/:id', prototypesHandler.getOne);

/**
 * POST /objects/prototypes/:id
 * Update prototype with given id, according to json sent in body
 */
router.post('/prototypes/:id', prototypesHandler.updateOne);

/**
 * DELETE /objects/prototypes/:id
 * Delete prototype with given id
 */
router.delete('/prototypes/:id', prototypesHandler.deleteOne);

module.exports = router;
