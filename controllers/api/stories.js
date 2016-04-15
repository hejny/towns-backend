var ObjectModel = require('../../database/models/object');
var ObjectsPrototype = require('../../database/models/objectsPrototype');
var ObjectsHistory = require('../../database/models/objectsHistory');
var check = require('validator');
var userEvents = require('../../events/user');

/**
 * Controller for handling stories
 * @type {{}}
 */
var storiesController = {};


/**
 * Gets all stories from object collection
 * @param req
 * @param res
 */

storiesController.getAll = function (req, res) {

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






module.exports = storiesController;