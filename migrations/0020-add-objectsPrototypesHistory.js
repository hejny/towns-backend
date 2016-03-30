var mongodb = require('mongodb');

exports.up = function(db, next){

    var objectsPrototypesHistory = db.collection('objectsPrototypesHistory');
    objectsPrototypesHistory.createIndex({
        type: 1,
        _currentId: 1,
        _prototypeId: 1,
        owner: 1
    });

    // objectsPrototypesHistory.insert([
    //     {
    //         "_prototypeId": "507f1f77bcf86cd799439011",
    //         name: "Kamenný domek",
    //         type: "building",
    //         subtype: "main",
    //         design: {
    //             type: "model",
    //             data: {
    //                 particles: [
    //                     {
    //                         shape:{
    //                             type: 'prism',
    //                             n:4
    //                         },
    //                         color: "#cccccc",
    //                         position: {x:0,y:0,z:0},
    //                         size: {x:50,y:50,z:50},
    //                         rotation: {"xy":0,"xz":0}
    //
    //                     },{
    //                         shape:{
    //                             type: 'prism',
    //                             n:4,
    //                             top:0
    //                         },
    //                         color: "#cccccc",
    //                         position: {x:0,y:0,z:100},
    //                         size: {x:50,y:50,z:40},
    //                         rotation: {"xy":0,"xz":0}
    //
    //                     }
    //                 ]
    //             }
    //
    //         }
    //
    //     }
    // ], next);
    next();

};

exports.down = function(db, next){
    db.dropCollection('objectsPrototypesHistory', next);};
