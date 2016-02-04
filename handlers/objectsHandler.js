var ObjectModel = require('../models/object');
var ObjectsPrototype = require('../models/objectsPrototype');

/**
 * Handler for working with Objects
 * @type {{}}
 */
var objectsHandler =  {};

/**
 * Gets all objects from object collection
 * @param req
 * @param res
 * //TODO: finish granularity in searching objects /objects?x=x&y=y&radius=radius¬=not&type=type&subtype=subtype&keys=keys
 */

objectsHandler.getAll = function (req, res) {
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
};

/**
 * Creates object
 * @param req
 * @param res
 */
objectsHandler.createObject = function (req, res) {
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

};

module.exports = objectsHandler;