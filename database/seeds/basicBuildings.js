var buildings = [
    {
        name: "Katapult",
        type: "building",
        subtype: "main",
        design: {
            type: "model",
            data: {
                "name": "root",
                "particles": [
                    {
                        "name": "site",
                        "particles": [
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "wood_raw",
                                "position": {
                                    "x": -10,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 5,
                                    "y": 5,
                                    "z": 40
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 2,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "wood_raw",
                                "position": {
                                    "x": 10,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 5,
                                    "y": 5,
                                    "z": 40
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": -2,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 3,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "wood_fence",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 10
                                },
                                "size": {
                                    "x": 30,
                                    "y": 5,
                                    "z": 5
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "stone_bricks",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 40,
                                    "y": 3,
                                    "z": 3
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 6,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "link": "site",
                        "position": {
                            "x": 0,
                            "y": -6,
                            "z": 0
                        },
                        "rotation": 0
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 6,
                            "top": 1,
                            "bottom": 1,
                            "rotated": false
                        },
                        "material": "wood_raw",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 35
                        },
                        "size": {
                            "x": 5,
                            "y": 15,
                            "z": 5
                        },
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 9,
                            "top": 1,
                            "bottom": 1,
                            "rotated": false
                        },
                        "material": "wood_raw",
                        "position": {
                            "x": 10,
                            "y": 0,
                            "z": 20
                        },
                        "size": {
                            "x": 7,
                            "y": 3,
                            "z": 60
                        },
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": -5,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 4,
                            "top": 1,
                            "bottom": 1,
                            "rotated": false
                        },
                        "material": "stone_plain",
                        "position": {
                            "x": 10,
                            "y": 0,
                            "z": 15
                        },
                        "size": {
                            "x": 10,
                            "y": 10,
                            "z": 10
                        },
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 4,
                            "top": 1,
                            "bottom": 1,
                            "rotated": false
                        },
                        "material": "wood_fence",
                        "position": {
                            "x": 13,
                            "y": 0,
                            "z": 11
                        },
                        "size": {
                            "x": 3,
                            "y": 25,
                            "z": 3
                        },
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "rotation": 0,
                "size": 1
            }
        },
        actions: [
            /**/{
                "type": "defense",
                "params": {
                    "defense": 1//[lifes / round]
                }
            }, /**/
            /**/{
                "type": "regenerate",
                "params": {
                    "regenerate": 3600//[s]
                }
            }, /**/
            /**/{
                "type": "repair",
                "params": {
                    "repair": 100//[%]
                }
            }, /**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /**/{
                "type": "attack",
                "params": {
                    "distance": 5,//[fields]
                    "strength": 1,//[lifes / round]
                    "rounds": 5,//[rounds]
                    "cooldown": 600//[s]
                }
            }, /**/
            /**/{
                "type": "move",
                "params": {
                    "speed": 1//[fields / s]

                }
            }, /**/
            /**/{
                "type": "throughput",
                "params": {
                    "throughput": 20//[%]
                }
            }
        ]
    }
    ,
    {
        name: "Beranidlo",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                "name": "root",
                "particles": [
                    {
                        "name": "",
                        "particles": [
                            {
                                "name": "wheel",
                                "shape": {
                                    "type": "prism",
                                    "n": 20,
                                    "rotated": true,
                                    "top": 1,
                                    "bottom": 1
                                },
                                "material": "wood_fence",
                                "position": {
                                    "x": 15,
                                    "y": 20,
                                    "z": 0
                                },
                                "size": {
                                    "x": 5,
                                    "y": 20,
                                    "z": 20
                                },
                                "rotation": 0
                            },
                            {
                                "link": "wheel",
                                "position": {
                                    "x": -15,
                                    "y": 20,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "wheel",
                                "position": {
                                    "x": 15,
                                    "y": -20,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "wheel",
                                "position": {
                                    "x": -15,
                                    "y": -20,
                                    "z": 0
                                },
                                "rotation": 0
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 4,
                            "top": 1,
                            "bottom": 1,
                            "rotated": false
                        },
                        "material": "wood_raw",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 6
                        },
                        "size": {
                            "x": 35,
                            "y": 76,
                            "z": 10
                        },
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "m",
                        "particles": [
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "clay_bricks",
                                "position": {
                                    "x": -8,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 5,
                                    "y": 10,
                                    "z": 30
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "clay_bricks",
                                "position": {
                                    "x": 8,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 5,
                                    "y": 10,
                                    "z": 30
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "iron_plates",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 15
                                },
                                "size": {
                                    "x": 2,
                                    "y": 2,
                                    "z": 15
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": -4,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "iron_plates",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 15
                                },
                                "size": {
                                    "x": 2,
                                    "y": 2,
                                    "z": 15
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 4,
                                        "y": 0
                                    }
                                }
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": -20,
                            "z": 16
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "link": "m",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 16
                        },
                        "rotation": 0
                    },
                    {
                        "link": "m",
                        "position": {
                            "x": 0,
                            "y": 20,
                            "z": 16
                        },
                        "rotation": 0
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 20,
                            "top": 1,
                            "bottom": 1,
                            "rotated": true
                        },
                        "material": "wood_fence",
                        "position": {
                            "x": 0,
                            "y": 7,
                            "z": 24
                        },
                        "size": {
                            "x": 35,
                            "y": 13,
                            "z": 13
                        },
                        "rotation": 90,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 9,
                            "top": 1,
                            "bottom": 1,
                            "rotated": true
                        },
                        "material": "wood_raw",
                        "position": {
                            "x": 0,
                            "y": 40,
                            "z": 23
                        },
                        "size": {
                            "x": 3,
                            "y": 15,
                            "z": 15
                        },
                        "rotation": 90,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "rotation": 0,
                "size": 0.6
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params": {
                    "defense": 2//[lifes / round]
                }
            }, /**/
            /**/{
                "type": "regenerate",
                "params": {
                    "regenerate": 3600//[s]
                }
            }, /**/
            /**/{
                "type": "repair",
                "params": {
                    "repair": 50//[%]
                }
            }, /**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /**/{
                "type": "attack",
                "params": {
                    "distance": 1,//[fields]
                    "strength": 5,//[lifes / round]
                    "rounds": 1,//[rounds]
                    "cooldown": 2//[s]
                }
            }, /**/
            /**/{
                "type": "move",
                "params": {
                    "speed": 1//[fields / s]

                }
            }, /**/
            /**/{
                "type": "throughput",
                "params": {
                    "throughput": 20//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Těžba hlíny",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data:  {
                "name": "",
                "particles": [
                    {
                        "name": "grid",
                        "particles": [
                            {
                                "name": "i",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "rotated": false,
                                    "top": 1,
                                    "bottom": 1
                                },
                                "material": "wood_fence",
                                "position": {
                                    "x": 5,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 1,
                                    "y": 40,
                                    "z": 2
                                },
                                "rotation": 0
                            },
                            {
                                "link": "i",
                                "position": {
                                    "x": -5,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "i",
                                "position": {
                                    "x": 10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "i",
                                "position": {
                                    "x": -10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "i",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "link": "grid",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "rotation": 90
                    },
                    {
                        "name": "",
                        "particles": [
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 9,
                                    "top": 0.2,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "stone_bricks",
                                "position": {
                                    "x": 5,
                                    "y": 5,
                                    "z": 0
                                },
                                "size": {
                                    "x": 20,
                                    "y": 15,
                                    "z": 20
                                },
                                "rotation": 320,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "position": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "size": 1.8,
                "rotation": 0,
                "skew": {
                    "z": {
                        "x": 0,
                        "y": 0
                    }
                }
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 1//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /**/{
                "type": "mine",
                "params":{
                    "resource": "clay",//[resource]
                    "amount": 1//[resources / s]
                }
            },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 50//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Těžba železa",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 1//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /**/{
                "type": "mine",
                "params":{
                    "resource": "iron",//[resource]
                    "amount": 1//[resources / s]
                }
            },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 50//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Kamenolom",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                name:'root',

                "particles": [ { "name": "", "particles": [ { "name": "floor", "particles": [ { "name": "row", "particles": [ { "name": "brick", "shape": { "type": "prism", "n": 4, "rotated": false, "top": 1, "bottom": 1.1 }, "material": "stone_bricks", "position": { "x": 0, "y": 0, "z": 0 }, "size": { "x": 7, "y": 14, "z": 5 }, "rotation": 0 }, { "link": "brick", "position": { "x": 10, "y": 0, "z": 0 }, "rotation": 0 }, { "link": "brick", "position": { "x": 30, "y": 0, "z": 0 }, "rotation": 0 }, { "link": "brick", "position": { "x": 20, "y": 0, "z": 0 }, "rotation": 0 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "link": "row", "position": { "x": 0, "y": 15, "z": 0 }, "rotation": 0 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "link": "floor", "position": { "x": -6, "y": 0, "z": 0 }, "rotation": 290 } ], "position": { "x": 0, "y": 0, "z": 0 }, "size": 1, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } }, { "name": "", "shape": { "type": "prism", "n": 4, "top": 1, "bottom": 1, "rotated": false }, "material": "stone_bricks", "position": { "x": 17, "y": -17, "z": 0 }, "size": { "x": 25, "y": 25, "z": 18 }, "rotation": 30, "skew": { "z": { "x": 0, "y": 0 } } }, { "name": "", "shape": { "type": "prism", "n": 4, "top": 1, "bottom": 1, "rotated": false }, "material": "stone_bricks", "position": { "x": 23, "y": -6, "z": 0 }, "size": { "x": 25, "y": 19, "z": 12 }, "rotation": 0, "skew": { "z": { "x": 0, "y": 0 } } } ]


            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 1//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /**/{
                "type": "mine",
                "params":{
                    "resource": "stone",//[resource]
                    "amount": 1//[resources / s]
                }
            },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 50//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Dřevorubec",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 1//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /**/{
                "type": "mine",
                "params":{
                    "resource": "wood",//[resource]
                    "amount": 1//[resources / s]
                }
            },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 50//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Kamenná cesta",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /*/{
             "type": "defense",
             "params":{
             "defense": 1//[lifes / round]
             }
             },/**/
            /*/{
             "type": "regenerate",
             "params":{
             "regenerate": 3600//[s]
             }
             },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 150//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Hliněná cesta",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /*/{
             "type": "defense",
             "params":{
             "defense": 1//[lifes / round]
             }
             },/**/
            /*/{
             "type": "regenerate",
             "params":{
             "regenerate": 3600//[s]
             }
             },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput":120//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Dřevěná cesta",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /*/{
             "type": "defense",
             "params":{
             "defense": 1//[lifes / round]
             }
             },/**/
            /*/{
             "type": "regenerate",
             "params":{
             "regenerate": 3600//[s]
             }
             },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 150//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Kamenná věž",
        type: "building",
        subtype: "main",

        design: {
            type: "model",
            data:  {
                "name": "root",
                "particles": [
                    {
                        "name": "floor",
                        "particles": [
                            {
                                "name": "pillar",
                                "particles": [
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "stone_bricks",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 10,
                                            "y": 10,
                                            "z": 20
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 2,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "stone_bricks",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 20
                                        },
                                        "size": {
                                            "x": 10,
                                            "y": 10,
                                            "z": 20
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0.3,
                                                "y": 0.3
                                            }
                                        }
                                    }
                                ],
                                "position": {
                                    "x": 10,
                                    "y": 10,
                                    "z": 0
                                },
                                "size": 1,
                                "rotation": 180,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -10,
                                    "y": 10,
                                    "z": 0
                                },
                                "rotation": 270
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 10,
                                    "y": -10,
                                    "z": 0
                                },
                                "rotation": 90
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -10,
                                    "y": -10,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "stone_bricks",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 40
                                },
                                "size": {
                                    "x": 40,
                                    "y": 40,
                                    "z": 5
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "link": "floor",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 45
                        },
                        "rotation": 0
                    },
                    {
                        "name": "",
                        "shape": {
                            "type": "prism",
                            "n": 4,
                            "top": 0,
                            "bottom": 1,
                            "rotated": false
                        },
                        "material": "clay_roof",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 90
                        },
                        "size": {
                            "x": 30,
                            "y": 30,
                            "z": 30
                        },
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "rotation": 0,
                "size": 1
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 10//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 3600//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /**/{
                "type": "attack",
                "params":{
                    "distance": 1,//[fields]
                    "strength": 1,//[lifes / round]
                    "rounds": 1,//[rounds]
                    "cooldown": 600//[s]
                }
            },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Dřevěná věž",
        type: "building",
        subtype: "main",

        "design": {
            "type": "model",
            "data": {
                "name": "",
                "particles": [
                    {
                        "name": "floor",
                        "particles": [
                            {
                                "name": "site",
                                "particles": [
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "rotated": false,
                                            "top": 1,
                                            "bottom": 1
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": -10,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 5,
                                            "y": 5,
                                            "z": 40
                                        },
                                        "rotation": 0
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 10,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 5,
                                            "y": 5,
                                            "z": 40
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": -10,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 5,
                                            "y": 5,
                                            "z": 40
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 4,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 10,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 5,
                                            "y": 5,
                                            "z": 40
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": -4,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_fence",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 35
                                        },
                                        "size": {
                                            "x": 40,
                                            "y": 5,
                                            "z": 5
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    }
                                ],
                                "position": {
                                    "x": 0,
                                    "y": 10,
                                    "z": 0
                                },
                                "size": 1,
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "link": "site",
                                "position": {
                                    "x": 0,
                                    "y": -10,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "site",
                                "position": {
                                    "x": 10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 90
                            },
                            {
                                "link": "site",
                                "position": {
                                    "x": -10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 90
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "name": "",
                        "particles": [
                            {
                                "name": "anchor",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "shadow",
                                "position": {
                                    "x": 10,
                                    "y": 10,
                                    "z": 0
                                },
                                "size": {
                                    "x": 10,
                                    "y": 10,
                                    "z": 4
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "link": "anchor",
                                "position": {
                                    "x": 10,
                                    "y": -10,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "anchor",
                                "position": {
                                    "x": -10,
                                    "y": 10,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "anchor",
                                "position": {
                                    "x": -10,
                                    "y": -10,
                                    "z": 0
                                },
                                "rotation": 0
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    },
                    {
                        "link": "floor",
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 40
                        },
                        "rotation": 0
                    },
                    {
                        "name": "",
                        "particles": [
                            {
                                "name": "",
                                "shape": {
                                    "type": "prism",
                                    "n": 4,
                                    "top": 1,
                                    "bottom": 1,
                                    "rotated": false
                                },
                                "material": "wood_raw",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": {
                                    "x": 30,
                                    "y": 30,
                                    "z": 4
                                },
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "particles": [
                                    {
                                        "name": "pillar",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 7,
                                            "y": 7,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 4,
                                            "y": 4,
                                            "z": 20
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "link": "pillar",
                                        "position": {
                                            "x": -7,
                                            "y": 7,
                                            "z": 0
                                        },
                                        "rotation": 0
                                    },
                                    {
                                        "link": "pillar",
                                        "position": {
                                            "x": 7,
                                            "y": -7,
                                            "z": 0
                                        },
                                        "rotation": 0
                                    },
                                    {
                                        "link": "pillar",
                                        "position": {
                                            "x": -7,
                                            "y": -7,
                                            "z": 0
                                        },
                                        "rotation": 0
                                    }
                                ],
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 3
                                },
                                "size": 1,
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "name": "",
                                "particles": [
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 8,
                                            "top": 0,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "iron_plates",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 28,
                                            "y": 28,
                                            "z": 20
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    }
                                ],
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 22
                                },
                                "size": 1,
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 80
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "position": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "size": 1,
                "rotation": 0,
                "skew": {
                    "z": {
                        "x": 0,
                        "y": 0
                    }
                }
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 5//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 100//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /**/{
                "type": "attack",
                "params":{
                    "distance": 1,//[fields]
                    "strength": 1,//[lifes / round]
                    "rounds": 1,//[rounds]
                    "cooldown": 600//[s]
                }
            },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Velká zeď",
        type: "building",
        subtype: "wall",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 2//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 3600//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Malá zeď",
        type: "building",
        subtype: "wall",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 1//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 3600//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Velká hradba",
        type: "building",
        subtype: "wall",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 6//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 3600//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Malá hrádba",
        type: "building",
        subtype: "wall",

        design: {
            type: "model",
            data: {
                name:'root',
                particles: [
                    {
                        name: '',
                        shape: {
                            type: 'prism',
                            n:4,
                            rotated:false,
                            top: 1,
                            bottom: 1
                        },
                        material: 'clay_bricks',
                        position: {x:0,y:0,z:0},
                        size: {x:40,y:40,z:40},
                        rotation: 0
                    }
                    /*
                     ,{
                     link: Locale.get('shape cube'),
                     position: {x:0,y:0,z:40},
                     size: 0.7,
                     rotation: 45
                     }
                     */
                ]
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 5//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 3600//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Velká palisáda",
        type: "building",
        subtype: "wall",

        design: {
            type: "model",
            data:  {
                "name": "root",
                "particles": [
                    {
                        "name": "",
                        "particles": [
                            {
                                "name": "pillar",
                                "particles": [
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 20,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 6,
                                            "y": 6,
                                            "z": 35
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 13,
                                            "top": 0,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 35
                                        },
                                        "size": {
                                            "x": 6,
                                            "y": 6,
                                            "z": 15
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 4,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 0,
                                            "y": 10,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 4,
                                            "y": 4,
                                            "z": 25
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": -2
                                            }
                                        }
                                    }
                                ],
                                "position": {
                                    "x": -25,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": 1,
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -20,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -15,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -5,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 5,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 15,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 20,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 25,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "rotation": 0,
                "size": 1
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 4//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]

    }
    ,
    {
        name: "Malá palisáda",
        type: "building",
        subtype: "wall",

        design: {
            type: "model",
            data:  {
                "name": "root",
                "particles": [
                    {
                        "name": "",
                        "particles": [
                            {
                                "name": "pillar",
                                "particles": [
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 20,
                                            "top": 1,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "size": {
                                            "x": 5,
                                            "y": 5,
                                            "z": 25
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    },
                                    {
                                        "name": "",
                                        "shape": {
                                            "type": "prism",
                                            "n": 13,
                                            "top": 0,
                                            "bottom": 1,
                                            "rotated": false
                                        },
                                        "material": "wood_raw",
                                        "position": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 25
                                        },
                                        "size": {
                                            "x": 5,
                                            "y": 5,
                                            "z": 10
                                        },
                                        "rotation": 0,
                                        "skew": {
                                            "z": {
                                                "x": 0,
                                                "y": 0
                                            }
                                        }
                                    }
                                ],
                                "position": {
                                    "x": -25,
                                    "y": 0,
                                    "z": 0
                                },
                                "size": 1,
                                "rotation": 0,
                                "skew": {
                                    "z": {
                                        "x": 0,
                                        "y": 0
                                    }
                                }
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -20,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -15,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": -5,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 0,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 5,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 10,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 15,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 20,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            },
                            {
                                "link": "pillar",
                                "position": {
                                    "x": 25,
                                    "y": 0,
                                    "z": 0
                                },
                                "rotation": 0
                            }
                        ],
                        "position": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "size": 1,
                        "rotation": 0,
                        "skew": {
                            "z": {
                                "x": 0,
                                "y": 0
                            }
                        }
                    }
                ],
                "rotation": 0,
                "size": 1
            }
        },

        actions: [
            /**/{
                "type": "defense",
                "params":{
                    "defense": 3//[lifes / round]
                }
            },/**/
            /**/{
                "type": "regenerate",
                "params":{
                    "regenerate": 1800//[s]
                }
            },/**/
            /**/{
                "type": "repair",
                "params":{
                    "repair": 50//[%]
                }
            },/**/
            /*/{
             "type": "mine",
             "params":{
             "resource": "wood",//[resource]
             "amount": 1//[resources / s]
             }
             },/**/
            /*/{
             "type": "attack",
             "params":{
             "distance": 1,//[fields]
             "strength": 1,//[lifes / round]
             "rounds": 1,//[rounds]
             "cooldown": 600//[s]
             }
             },/**/
            /*/{
             "type": "move",
             "params":{
             "speed": 1//[fields / s]

             }
             },/**/
            /**/{
                "type": "throughput",
                "params":{
                    "throughput": 0//[%]
                }
            }
        ]
    }
];


module.exports = buildings;