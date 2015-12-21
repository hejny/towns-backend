var express = require('express');
var router = express.Router();
var object = require('../models/object');

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
    console.log(req.body.x);
    console.log(req.body.y);
    console.log(req.body.objectType);

    var object = new Object({
        x: req.body.x,
        y: req.body.y,
        objectType: req.body.objectType
    });
    object.save(function (err, object) {
        if (err) { return next(err) }
        res.json(201, object)
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
