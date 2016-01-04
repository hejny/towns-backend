var express = require('express');
var router = express.Router();
var Object = require('../models/object');
var ObjectsPrototype = require('../models/objectsPrototype');

/**
 * GET /objects
 * vrati vsetky objekty
 */
router.get('/', function(req, res, next) {
    Object.find(function(err, objects) {
        if (err) { return next()}
        res.json(objects)
    });
    //res.json({ GET: 'Vypytaj vsetky objekty' });
});

/**
 * POST /objects
 * Vytvor odoslany objekt
 */
router.post('/', function(req, res, next) {
    var newObject = {};
    //console.log(req.body);

    // check that mandatory values are set
    if(!req.body.hasOwnProperty('prototypeId') || !req.body.hasOwnProperty('x') || !req.body.hasOwnProperty('y')) {
        // mandatory validation failed
    }

    // find the Prototype
    //console.log(req.body.prototypeId);
    ObjectsPrototype.findOne({type: "building"}, function(err, objectsPrototype) {
        if (err) { return next() }
        //console.log(objectsPrototype);
        for (var key in objectsPrototype._doc) {
            if (objectsPrototype._doc.hasOwnProperty(key) && key !== "_id") {
                newObject[key] = objectsPrototype["_doc"][key];
            }
        }

        // set the other values
        newObject.version = 1;
        newObject.x = req.body.x;
        newObject.y = req.body.y;
        newObject.start_time = Date.now();
        if(req.body.hasOwnProperty('content') && req.body.content.hasOwnProperty('type') && req.body.content.hasOwnProperty('data') ) {
            newObject.content = {
                type: req.body.content.type,
                data: req.body.content.data
            };
        }
        newObject.owner = "admin";
        var object = new Object(newObject);

        console.log(newObject);
        // save the newly created object to DB
        object.save(function (err, object) {
            if (err) { return next(err) }
            res.status(201).json({
                "status": "ok",
                "objectId": object._id
            })
        });

    });

});

/**
 * GET /objects/prototypes
 * vrati vsetky prototypu objektov
 */
router.get('/prototypes', function(req, res, next) {
    ObjectsPrototype.find(function(err, objectsPrototypes) {
        if (err) { return next()}
        res.json(objectsPrototypes)
    });
});

/**
 * POST /objects/prototypes
 * Vytvor odoslany prototyp objektu
 */
router.post('/prototypes', function(req, res, next) {
    var newPrototype = {},
        json = req.body;
    //console.log(json.type);

    // check that mandatory values are set
    if(json.hasOwnProperty('type')) {
    }

    newPrototype.name = req.body.hasOwnProperty('name') ? req.body.name : "";
    newPrototype.type = req.body.hasOwnProperty('type') ? req.body.type : "";
    newPrototype.subtype = req.body.hasOwnProperty('subtype') ? req.body.subtype : "";
    newPrototype.locale = req.body.hasOwnProperty('locale') ? req.body.locale : "";
    if(req.body.hasOwnProperty('design') ) {
        type = req.body.design.hasOwnProperty('type') ? req.body.design.type : "";
        data = req.body.design.hasOwnProperty('data') ? req.body.design.data : "";
        newPrototype.design = {
            type: type,
            data: data
        };
    }
    if(req.body.hasOwnProperty('content') ) {
        type = req.body.content.hasOwnProperty('type') ? req.body.content.type : "";
        data = req.body.content.hasOwnProperty('data') ? req.body.content.data : "";
        newPrototype.content = {
            type: type,
            data: data
        };
    }
    if(json.hasOwnProperty('properties')) {
        var properties = json.properties;
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                if(!newPrototype.hasOwnProperty("properties")){
                    newPrototype.properties = {};
                }
                newPrototype["properties"][key] = properties[key];
            }
        }
    }
    newPrototype.actions = req.body.hasOwnProperty('actions') ? req.body.actions : "";


    newPrototype.owner = "admin";
    //console.log(newPrototype);

    var prototype = new ObjectsPrototype(newPrototype);

    // save the newly created prototype of object to DB
    prototype.save(function (err, object) {
        if (err) { return next(err) }
        res.status(201).json({
            "status": "ok",
            "objectId": object._id
        })
    });


});

/**
 * GET /objects/:id
 * Vypytaj len objekt s id
 */
router.get('/:id', function(req, res) {
    res.json({ GET: 'Vypytaj len objekt s id '+ req.params.id });
});

/**
 * PUT /objects/:id
 * Updatni objekt s danym id
 */
router.put('/', function (req, res) {
    res.send({ PUT: 'Updatni objekt s id ' + req.params.id});
});

/**
 * DELETE /objects/:id
 * Vymaz objekt s danym id
 */
router.delete('/', function (req, res) {
    res.json({ DELETE: 'Vymaz objekt s id' + req.params.id});
});


module.exports = router;
