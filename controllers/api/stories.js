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

    // example
    // /stories?owner[]=5666b8259297ffe7c16c4697&limit=45&date[]=12-05-2016&locale[]=cs&latest=true
    // default values
    // limit (1, 500) 0 is max.
    var values = {
        'owner': [],
        'limit': 0,
        'date': [],
        'locale': ['cs'],
        'latest': true
    };

    // update default values with values from query
    var q = req.query;
    if(typeof q.owner !== 'undefined' && q.owner && q.owner.constructor === Array) {
        values.owner = q.owner;
    }
    if(typeof q.limit !== 'undefined' && q.limit && check.isInt(q.limit, {min:1, max:500})) {
        values.limit = q.limit;
    }
    if(typeof q.date !== 'undefined' && q.date && q.date.constructor === Array) {
        values.date = q.date;
    }
    if(typeof q.locale !== 'undefined' && q.locale && q.locale.constructor === Array) {
        values.locale = q.locale;
    }
    if(typeof q.latest !== 'undefined' && q.latest && check.isBoolean(q.latest)) {
        values.latest = q.latest;
    }


    // TODO: continute from here
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