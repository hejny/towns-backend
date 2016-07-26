var Promise = require('promise');
var ObjectModel = require('../database/models/object');
var objectServices = {};

objectServices.buildPrototype = function(objectsPrototype, request){
    return new Promise(function(resolve, reject){
        console.log("Building object from prototype id: " + objectsPrototype._id);



        var newObject = {},
            json = request.body;
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
        newObject.owner = request.user._id;

        var object = new ObjectModel(newObject);

        //console.log(newObject);
        // save the newly created object to DB
        object.save(function (err, object) {
            if (err) {
                var errMessage = [];
                for (var errName in err.errors) {
                    errMessage.push({param: err.errors[errName].path, msg: err.errors[errName].kind, value: err.errors[errName].value});
                }
                reject(errMessage);
            }

            resolve(object);
        });



    });
};

module.exports = objectServices;
