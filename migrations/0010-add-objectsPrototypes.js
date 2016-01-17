var mongodb = require('mongodb');

exports.up = function (db, next) {

    var objectsPrototypes = db.collection('objectsPrototypes');
    objectsPrototypes.createIndex({
        type: 1,
        owner: 1
    });

    objectsPrototypes.insert([

        //==============================================================================================================building

        {
            name: "Kamenný domek",
            type: "building",
            subtype: "main",
            design: {
                type: "model",
                data: {
                    particles: [
                        {
                            shape:{
                                type: 'prism',
                                n:4
                            },
                            color: "#cccccc",
                            position: {x:0,y:0,z:0},
                            size: {x:50,y:50,z:50},
                            rotation: {"xy":0,"xz":0}

                        },{
                            shape:{
                                type: 'prism',
                                n:4,
                                top:0
                            },
                            color: "#cccccc",
                            position: {x:0,y:0,z:100},
                            size: {x:50,y:50,z:40},
                            rotation: {"xy":0,"xz":0}

                        }
                    ]
                }

            }

        },{
            name: "Kamenná pyramida",
            type: "building",
            subtype: "block",
            design: {
                type: "model",
                data: {
                    particles: [
                        {
                            shape:{
                                type: 'prism',
                                n:4,
                                top:1
                            },
                            color: "#cccccc",
                            position: {x:0,y:0,z:0},
                            size: {x:50,y:50,z:50},
                            rotation: {"xy":0,"xz":0}

                        }
                    ]
                }

            }

        },{
            name: "Kamenný ježek",
            type: "building",
            subtype: "wall",
            design: {
                type: "model",
                data: {
                    particles: [
                        {
                            shape:{
                                type: 'prism',
                                n:3,
                                top:0.1
                            },
                            color: "#cccccc",
                            position: {x:0,y:0,z:0},
                            size: {x:40,y:40,z:40},
                            rotation: {"xy":30,"xz":0}

                        }
                    ]
                }

            }

        },


        //==============================================================================================================terrain
        {
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:1,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:2,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:3,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:4,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:5,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:6,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:7,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:8,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:9,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:10,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:11,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:12,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:13,
                    size: 1
                }
            }
        },{
            "type": "terrain",
            "name": "Terén",
            "design": {
                "type": "terrain",
                "data":{
                    image:14,
                    size: 1
                }
            }
        },


        //==============================================================================================================story


        {
            "name": "Příběh",
            "type": "story",
            "locale": "cs",
            "content": {
                "type": "markdown",
                "data": "Kde bolo tam bolo"
            },
            "owner": "5126bc054aed4daf9e2ab772"
        }


        //==============================================================================================================
    ], next);

};

exports.down = function (db, next) {
    db.dropCollection('objectsPrototypes', next);
    //var objectsPrototypes = db.collection('objectsPrototypes');
    //objectsPrototypes.findOneAndUpdate({name: 'Ambasada'}, [], {}, {remove: true}, next);
};
