var ObjectModel = require('../../models/object');
var ObjectsPrototype = require('../../models/objectsPrototype');
var ObjectsHistory = require('../../models/objectsHistory');
var check = require('validator');

/**
 * Handler for working with Objects
 * @type {{}}
 */
var objectsController =  {};

/**
 * Gets all objects from object collection
 * @param req
 * @param res
 */

objectsController.getAll = function (req, res) {

    // default values
    var values = {
        'x': 0,
        'y': 0,
        'radius': 10,
        'not': [],
        'type': [],
        'subtype': [],
        'keys': []
    };

    // update default values with values from query
    var q = req.query;
    if(typeof q.x !== 'undefined' && q.x && check.isInt(q.x)) {
        values.x = q.x;
    }
    if(typeof q.y !== 'undefined' && q.y && check.isInt(q.y)) {
        values.y = q.y;
    }
    if(typeof q.radius !== 'undefined' && q.radius && check.isInt(q.radius, {min:1, max:200})) {
        values.radius = q.radius;
    }
    if(typeof q.not !== 'undefined' && q.not && q.not.constructor === Array) {
        values.not = q.not;
    }
    if(typeof q.type !== 'undefined' && q.type && q.type.constructor === Array) {
        values.type = q.type;
    }
    if(typeof q.subtype !== 'undefined' && q.subtype && q.subtype.constructor === Array) {
        values.subtype = q.subtype;
    }
    if(typeof q.keys !== 'undefined' && q.keys && q.keys.constructor === Array) {
        values.keys = q.keys;
    }

    //build `query` from values
    var query = {
        x: {$gt: (values.x - values.radius), $lt: ((+values.x) + (+values.radius))},
        y: {$gt: (values.y - values.radius), $lt: ((+values.y) + (+values.radius))}
    };
    if(values.not.length > 0 ) {
        query._id = {$nin: values.not};
    }
    if(values.type.length > 0 ) {
        query.type = {$in: values.type};
    }
    if(values.subtype.length > 0 ) {
        query.subtype = {$in: values.subtype};
    }
    console.log(query);

    // run the query against mongoDB
    ObjectModel.find(query, values.keys.join(' '), function (err, objects) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your objects"
            });
        }

        //console.log(objects);
        if (objects === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There are no objects"
            });
        }
        res.json(objects);
    });
};

/**
 * Returns object with given id
 * @param req
 * @param res
 */
objectsController.getOne = function (req, res) {
    var parameters = req.params;
    ObjectModel.findOne({"_id": parameters.id}, function (err, object) {

        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "Problem getting your object",
                    val: parameters.id
                }]
            });
        }

        //console.log(object);
        if (object === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "There is no such object",
                    val: ""+parameters.id
                }]
            });
        }

        res.json(object);
    });
};

/**
 * Creates object
 * @param req
 * @param res
 */
objectsController.createOne = function (req, res) {
    var newObject = {},
        json = req.body;
    //console.log(json);

    // find the Prototype
    ObjectsPrototype.findOne({_id: json.prototypeId}, function (err, objectsPrototype) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "prototypeId",
                    msg: "Problem getting your prototype",
                    val: json.prototypeId
                }]
            });
        }

        //console.log(objectsPrototype);
        if (objectsPrototype === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "prototypeId",
                    msg: "There is no such prototype",
                    val: ""
                }]
            });
        }

        for (var key in objectsPrototype._doc) {
            if (objectsPrototype._doc.hasOwnProperty(key)) {
                switch (key) {
                    case "_id":
                        newObject._prototypeId = objectsPrototype._doc._id;
                        break;
                    case "owner":
                        // we do nothing as we don't want to owner of prototype to be owner of new Objects
                        break;
                    default:
                        newObject[key] = objectsPrototype._doc[key];
                }
            }
        }

        // set the other values
        newObject.version = 0;
        newObject.x = json.x;
        newObject.y = json.y;
        if ((json.hasOwnProperty('name')) && (typeof json.name == "string") && (json.name.length > 0)) {
            newObject.name = json.name;
        }
        newObject.start_time = Date.now();
        var type = "",
            data = "";
        if (json.hasOwnProperty('content')) {
            type = json.content.hasOwnProperty('type') ? json.content.type : "";
            data = json.content.hasOwnProperty('data') ? json.content.data : "";
            newObject.content = {
                type: type,
                data: data
            };
        }
        if (json.hasOwnProperty('design')) {
            type = json.design.hasOwnProperty('type') ? json.design.type : "";
            data = json.design.hasOwnProperty('data') ? json.design.data : "";
            newObject.design = {
                type: type,
                data: data
            };
        }
        newObject.owner = "admin"; // todo: later here will go current user (find him from token used)

        var object = new ObjectModel(newObject);

        //console.log(newObject);
        // save the newly created object to DB
        object.save(function (err, object) {
            if (err) {
                var errMessage = [];
                for (var errName in err.errors) {
                    errMessage.push({param: err.errors[errName].path, msg: err.errors[errName].kind, value: err.errors[errName].value});
                }
                return res.status(400).json({
                    "status": "error",
                    "message": errMessage
                });
            }
            res.status(201).json({
                "status": "ok",
                "objectId": object._id
            });
        });

    });

};

/**
 * Update object with given id, according to json sent in request
 * @param req
 * @param res
 */
objectsController.updateOne = function (req, res) {
    var objectId = req.params.id,
        json = req.body,
        history = {};
    ObjectModel.findOne({"_id": objectId}, function (err, object) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "Problem getting your object",
                    val: objectId
                }]
            });
        }

        if (object === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "There is no such object",
                    val: ""+objectId
                }]
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
            //console.log('Version of object was succesfully saved to ObjectsHistory');
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
            //console.log(object);
            res.status(200).json({
                "status": "ok",
                "objectId": object._id,
                "version": object.version
            });
        });

    });
};

/**
 * Deletes the object with given id
 * @param req
 * @param res
 */
objectsController.deleteOne = function (req, res) {
    var objectId = req.params.id,
        history = {};
    // get the object
    ObjectModel.findOne({"_id": objectId}, function (err, object) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "Problem getting your object",
                    val: objectId
                }]
            });
        }

        if (object === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "There is no such object",
                    val: ""+objectId
                }]
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
            //console.log('Version of object was succesfully saved to ObjectsHistory');

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

};

module.exports = objectsController;