var UserModel = require('../../models/user');
var bcrypt = require('bcrypt');

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var userController = {};


/**
 * Creates new user
 * @param req
 * @param res
 */
userController.createUser = function (req, res) {
    if(!req.body.hasOwnProperty('profile') || req.body.profile.username == null || req.body.profile.username == "" ) {
        res.status(400).json({
            "status": "error",
            "message": [{
                param: "profile.username",
                msg: "Username is required",
                val: ""
            }]
        });
    }

    if(!req.body.hasOwnProperty('login_methods') ||  req.body.login_methods.password == null || req.body.login_methods.password == "") {
        res.status(400).json({
            "status": "error",
            "message": [{
                param: "login_methods.password",
                msg: "Password is required",
                val: ""
            }]
        });
    }

    // check if user exist and if not then create it.
    UserModel.findOne({"names.username": req.body.profile.username}, function( err, user) {
        if (err) {
            return next(err);
        }
        if (user == null) {
            bcrypt.hash(req.body.login_methods.password, 10, function (bcryptError, hash) {
                if (bcryptError) { throw next(bcryptError) }

                newUser = new UserModel({
                    "profile": {
                        "username": req.body.profile.username,
                        "name": (req.body.profile.hasOwnProperty('name') ? req.body.profile.name : ""),
                        "surname": (req.body.profile.hasOwnProperty('surname') ? req.body.profile.surname : ""),
                        "birthday": (req.body.profile.hasOwnProperty('birthday') ? req.body.profile.birthday : ""),
                        "description": (req.body.profile.hasOwnProperty('description') ? req.body.profile.description : ""),
                        "image": (req.body.profile.hasOwnProperty('image') ? req.body.profile.image : ""),
                        "email": (req.body.profile.hasOwnProperty('email') ? req.body.profile.email : "")
                    },
                    "login_methods": {
                        "password": hash
                    }
                });

                newUser.save(function (saveError, savedUser) {
                    if (saveError) {
                        var errMessage = [];
                        for (var errName in saveError.errors) {
                            errMessage.push({param: err.errors[errName].path, msg: err.errors[errName].kind, value: err.errors[errName].value});
                        }
                        return res.status(400).json({
                            "status": "error",
                            "message": errMessage
                        });
                    }
                    res.status(201).json({
                        "status": "ok",
                        "objectId": savedUser._id
                    });
                })
            })
        } else {
            res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "Username is already registered",
                    val: "" + req.body.username
                }]
            });
        }

    });

};

/**
 * Returns user details of authorized user
 * @param req
 * @param res
 */
userController.getUser = function (req, res) {
    if (!req.headers['x-auth']) {
        return res.send(401);
    }
    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, config.secretKey);

    UserModel.findOne({'names.username': auth.username}, function( err, user) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "Problem getting user",
                    val: auth.username
                }]
            });
        }

        if (!user) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "There is no such user",
                    val: "" + auth.username
                }]
            });
        }
        res.json(user);
    });
};

module.exports = userController;