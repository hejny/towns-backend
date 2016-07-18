var ObjectsPrototypesHistory = require('../../database/models/objectsPrototypesHistory.js');
var ObjectsPrototype = require('../../database/models/objectsPrototype');
var objectsPrototype = require('../../services/objectsPrototype');

/**
 * Handler for work with ObjectPrototypes Collection
 * @type {{}}
 */
var prototypesController = {};

/**
 * Returns all Prototypes
 * @param req
 * @param res
 */
prototypesController.getAll = function (req, res) {
    ObjectsPrototype.find(function (err, objectsPrototypes) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting prototypes"
            });
        }

        //console.log(objectsPrototype);
        if (objectsPrototypes === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There are no prototypes"
            });
        }

        res.json(objectsPrototypes);
    });
};

/**
 * Creates given prototype
 * @param req
 * @param res
 */
prototypesController.createOne = function (req, res) {
    var newPrototype = {},
        json = req.body;

    newPrototype.name = json.hasOwnProperty('name') ? json.name : "";
    newPrototype.type = json.hasOwnProperty('type') ? json.type : "";
    newPrototype.subtype = json.hasOwnProperty('subtype') ? json.subtype : "";
    newPrototype.locale = json.hasOwnProperty('locale') ? json.locale : "";
    if (json.hasOwnProperty('design')) {
        type = json.design.hasOwnProperty('type') ? json.design.type : "";
        data = json.design.hasOwnProperty('data') ? json.design.data : "";
        newPrototype.design = {
            type: type,
            data: data
        };
    }
    if (json.hasOwnProperty('content')) {
        type = json.content.hasOwnProperty('type') ? json.content.type : "";
        data = json.content.hasOwnProperty('data') ? json.content.data : "";
        newPrototype.content = {
            type: type,
            data: data
        };
    }
    if (json.hasOwnProperty('properties')) {
        var properties = json.properties;
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                if (!newPrototype.hasOwnProperty("properties")) {
                    newPrototype.properties = {};
                }
                newPrototype.properties[key] = properties[key];
            }
        }
    }
    newPrototype.actions = json.hasOwnProperty('actions') ? json.actions : "";
    newPrototype.owner = req.user._id;
    //console.log(newPrototype);
    var prototype = new ObjectsPrototype(newPrototype);

    // save the newly created prototype of object to DB
    prototype.save(function (err, prototype) {
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
            "prototypeId": prototype._id
        });
    });
};

/**
 * Returns requested prototype
 * @param req
 * @param res
 */
prototypesController.getOne = function (req, res) {
    var id = req.params.id;

    objectsPrototype.findOne(id)
        .then(function(prototype) {
            res.json(prototype);
        })
        .catch(function(err) {
            return res.status(500).json({
                "status": "error",
                "message": err
            });
        });

};

/**
 * Update prototype with given id, according to json sent in request
 * @param req
 * @param res
 */
prototypesController.updateOne = function (req, res) {
    var prototypeId = req.params.id,
        json = req.body,
        history = {},
        newPrototype = {};
    ObjectsPrototype.findOne({"_id": prototypeId}, function (err, prototype) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "Problem getting your prototype",
                    val: prototypeId
                }]
            });
        }

        //console.log(object);
        if (prototype === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "There is no such prototype",
                    val: ""+prototypeId
                }]
            });
        }
        //console.log(prototype._doc);

        // create copy of current prototype in Objects Prototype history
        for (var name in prototype._doc) {
            if (prototype._doc.hasOwnProperty(name) && name != "_id") {
                history[name] = prototype._doc[name];
            }
        }

        history._prototypeId = prototype._id;
        //console.log(history);

        var prototypeHistory = new ObjectsPrototypesHistory(history);
        prototypeHistory.save(function (err) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            //console.log('Version of prototype was successfully saved to ObjectsPrototypesHistory');
        });


        // create newPrototype from json and previous prototype
        newPrototype.name = json.hasOwnProperty('name') ? json.name : "";
        newPrototype.type = json.hasOwnProperty('type') ? json.type : "";
        newPrototype.subtype = json.hasOwnProperty('subtype') ? json.subtype : "";
        newPrototype.locale = json.hasOwnProperty('locale') ? json.locale : "";
        if (json.hasOwnProperty('design')) {
            type = json.design.hasOwnProperty('type') ? json.design.type : "";
            data = json.design.hasOwnProperty('data') ? json.design.data : "";
            newPrototype.design = {
                type: type,
                data: data
            };
        }
        if (json.hasOwnProperty('content')) {
            type = json.content.hasOwnProperty('type') ? json.content.type : "";
            data = json.content.hasOwnProperty('data') ? json.content.data : "";
            newPrototype.content = {
                type: type,
                data: data
            };
        }
        if (json.hasOwnProperty('properties')) {
            var properties = json.properties;
            for (var key in properties) {
                if (properties.hasOwnProperty(key)) {
                    if (!newPrototype.hasOwnProperty("properties")) {
                        newPrototype.properties = {};
                    }
                    newPrototype.properties[key] = properties[key];
                }
            }
        }
        newPrototype.actions = json.hasOwnProperty('actions') ? json.actions : "";
        newPrototype.owner = req.user._id;
        var objectsPrototype = new ObjectsPrototype(newPrototype);

        // delete current prototype
        prototype.remove();

        // save the newly created prototype to DB
        objectsPrototype.save(function (err, prototype) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            res.status(200).json({
                "status": "ok",
                "prototypeId": prototype._id
            });
        });

    });
};

/**
 * Delete prototype with given id
 * @param req
 * @param res
 */
prototypesController.deleteOne = function (req, res) {
    var prototypeId = req.params.id,
        history = {};
    // get the prototype
    ObjectsPrototype.findOne({"_id": prototypeId}, function (err, prototype) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your prototype"
            });
        }
        //console.log(prototype);
        if (prototype === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There is no such prototype"
            });
        }


        // copy prototype to ObjectsPrototypesHistory collection
        for (var key in prototype._doc) {
            if (prototype._doc.hasOwnProperty(key) && key != "_id") {
                history[key] = prototype._doc[key];
            }
        }
        history._prototypeId = prototype._doc._id;
        //console.log(history);
        var prototypeHistory = new ObjectsPrototypesHistory(history);
        prototypeHistory.save(function (err) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            console.log('Prototype was backed up into ObjectsPrototypesHistory');

            // remove it from objects collection
            prototype.remove();

            // return success json
            res.status(200).json({
                "status": "deleted",
                "prototypeId": history._prototypeId,
                "prototypeHistoryId": history._id
            });
        });
    });
};

module.exports = prototypesController;