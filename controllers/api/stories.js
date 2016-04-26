var ObjectModel = require('../../database/models/object');
var check = require('validator');
var BaseController = require('../baseController');
/**
 * Controller for handling stories
 * @type {{}}
 */
var storiesController = new BaseController();


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
        values.limit = parseInt(q.limit);
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
    
    //build `query` from values
    var query = {
        type: "story"
    };
    if(values.owner.length > 0 ) {
        query.owner = {$in: values.owner};
    }

    values.date.forEach(function (element, index, array) {
        var date = element.split("-");
        if(date.length == 3 && check.isInt(date[0]) && check.isInt(date[1]) && check.isInt(date[2])) {
            var timezone = new Date().getTimezoneOffset();
            var from = new Date(parseInt(date[2]), parseInt(date[1])-1, parseInt(date[0]), 0, 0-timezone, 0, 0).toISOString();
            var to = new Date(parseInt(date[2]), parseInt(date[1])-1, parseInt(date[0]), 23, 59-timezone, 59, 999).toISOString();
            array[index] = { start_time: {$gte: from, $lt: to}};
        } else {
            array.splice(index, 1);
        }
        
    });

    if(values.date.length > 0 ) {
        query.$or = values.date;
    }

    if(values.locale.length > 0 ) {
        query.locale = {$in: values.locale};
    }

    // list fields to return
    var fields = {};

    // define options like limit of returned stories and ordering
    var options = {};
    if (values.limit > 0) {
        options.limit = values.limit;
    }
    if (values.latest === "true") {
        options.sort = {start_time: -1};
    }

    console.log(query);
    console.log(fields);
    console.log(options);

    // run the query against mongoDB
    ObjectModel.find(query, fields, options, function (err, objects) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting your stories"
            });
        }

        //console.log(objects);
        if (objects === null) {
            return res.json([]);
        }
        res.json(objects);
    });
};






module.exports = storiesController;