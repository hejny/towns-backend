var express = require('express');
var router = express.Router();
var ObjectModel = require('../models/object');
var ObjectsPrototype = require('../models/objectsPrototype');
var ObjectsHistory = require('../models/objectsHistory');

/**
 * GET /objects
 * vrati vsetky objekty
 */
router.get('/', function (req, res) {
    ObjectModel.find(function (err, objects) {
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
});

/**
 * POST /objects
 * Vytvor odoslany objekt (toto je create, nie update)
 */
router.post('/', function (req, res) {
    var newObject = {},
        json = req.body;
    //console.log(json);

    // find the Prototype
    ObjectsPrototype.findOne({_id: json.prototypeId}, function (err, objectsPrototype) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your prototype"
            });
        }

        //console.log(objectsPrototype);
        if (objectsPrototype === null) {
            return res.status(500).json({
                "status": "error",
                "message": "There is no such prototype"
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
        newObject.version = 1;
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

        console.log(newObject);
        // save the newly created object to DB
        object.save(function (err, object) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            res.status(201).json({
                "status": "ok",
                "objectId": object._id
            });
        });

    });

});

/**
 * GET /objects/prototypes
 * vrati vsetky prototypu objektov
 */
router.get('/prototypes', function (req, res) {
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
});

/**
 * POST /objects/prototypes
 * Vytvor odoslany prototyp objektu
 */
router.post('/prototypes', function (req, res) {
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
    newPrototype.owner = "admin"; // todo: later here will go current user (find him from token used)
    //console.log(newPrototype);
    var prototype = new ObjectsPrototype(newPrototype);

    // save the newly created prototype of object to DB
    prototype.save(function (err, object) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": err.errors
            });
        }
        res.status(201).json({
            "status": "ok",
            "objectId": object._id
        });
    });


});

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
 * TODO: finish this
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
                switch(key) {
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
 * TODO: finish this
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


module.exports = router;
