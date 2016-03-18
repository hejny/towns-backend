var UserModel = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config/server.json');

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var userController = {};


/**
 * Get all users from Users collection
 * @param req
 * @param res
 */
userController.getAll = function (req, res) {
    UserModel.find(function (err, users) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": "Problem getting users"
            });
        }

        if (users === null) {
            return res.status(400).json({
                "status": "error",
                "message": "There are no users"
            });
        }

        return res.status(200).json(users);
    });
};

/**
 * Creates new user
 * @param req
 * @param res
 */
userController.createUser = function (req, res) {

    if (!req.body.hasOwnProperty('profile') || req.body.profile.username == null || req.body.profile.username == "") {
        return res.status(400).json({
            "status": "error",
            "message": [{
                param: "profile.username",
                msg: "required",
                val: ""
            }]
        });
    }

    if (!req.body.hasOwnProperty('login_methods') || req.body.login_methods.password == null || req.body.login_methods.password == "") {
        return res.status(400).json({
            "status": "error",
            "message": [{
                param: "login_methods.password",
                msg: "required",
                val: ""
            }]
        });
    }

    // check if user exist and if not then create it.
    UserModel.findOne({"profile.username": req.body.profile.username}, function (err, user) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "profile.username",
                    msg: "Problem creating new users",
                    val: "" + req.body.profile.username
                }]
            });
        }
        if (user == null) {
            bcrypt.hash(req.body.login_methods.password, 10, function (bcryptError, hash) {
                if (bcryptError) {
                    return res.status(400).json({
                        "status": "error",
                        "message": [{
                            param: "login_methods.password",
                            msg: "Problem saving password",
                            val: "" + req.body.login_methods.password
                        }]
                    });
                }

                var newUserJson = {
                    "profile": {
                        "username": req.body.profile.username,
                        "name": (req.body.profile.hasOwnProperty('name') ? req.body.profile.name : ""),
                        "surname": (req.body.profile.hasOwnProperty('surname') ? req.body.profile.surname : ""),
                        "birthday": (req.body.profile.hasOwnProperty('birthday') ? req.body.profile.birthday : Date.now()),
                        "description": (req.body.profile.hasOwnProperty('description') ? req.body.profile.description : ""),
                        "image": (req.body.profile.hasOwnProperty('image') ? req.body.profile.image : ""),
                        "email": (req.body.profile.hasOwnProperty('email') ? req.body.profile.email : "")
                    },
                    "login_methods": {
                        "password": hash
                    }
                };
                if (req.body.hasOwnProperty('language')) {
                    newUserJson.language = req.body.language;
                }

                newUser = new UserModel(newUserJson);
                newUser.save(function (saveError, savedUser) {
                    if (saveError) {
                        var errMessage = [];
                        console.log(saveError);
                        for (var errName in saveError.errors) {
                            errMessage.push({
                                param: saveError.errors[errName].path,
                                msg: saveError.errors[errName].kind,
                                val: "" + saveError.errors[errName].value
                            });
                        }
                        return res.status(400).json({
                            "status": "error",
                            "message": errMessage
                        });
                    }
                    return res.status(201).json({
                        "status": "ok",
                        "userId": savedUser._id
                    });
                })
            })
        } else {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "profile.username",
                    msg: "taken",
                    val: "" + req.body.profile.username
                }]
            });
        }

    });

};

/**
 * Returns user details of authorized user (/users/me)
 * @param req
 * @param res
 */
userController.getUser = function (req, res) {
    if (!req.headers['x-auth']) {
        return res.sendStatus(401);
    }
    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, config.secretKey);

    UserModel.findOne({'profile.username': auth.username}, function (err, user) {
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

/**
 * Returns user with given _id
 * @param req
 * @param res
 */
userController.getOne = function (req, res) {
    var parameters = req.params;
    UserModel.findOne({'_id': parameters.id}, function (err, user) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "Problem getting user",
                    val: "" + parameters.id
                }]
            });
        }

        if (!user) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "There is no such user",
                    val: "" + parameters.id
                }]
            });
        }
        res.json(user);
    });
};

/**
 * Updates the user with given _id
 * @param req
 * @param res
 */
userController.updateOne = function (req, res) {
    var userId = req.params.id,
        json = req.body,
        history = {},
        newUser = {};
    UserModel.findOne({"_id": userId}, function (err, originalUser) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "Problem getting user",
                    val: userId
                }]
            });
        }

        if (originalUser === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "id",
                    msg: "There is no such user",
                    val: "" + userId
                }]
            });
        }

        // create copy of current user in UsersHistory
        for (var name in originalUser._doc) {
            if (originalUser._doc.hasOwnProperty(name) && name != "_id") {
                history[name] = originalUser._doc[name];
            }
        }
        history._current_id = originalUser._id;
        history.stop_time = Date.now();

        var userHistory = new UsersHistoryModel(history);
        userHistory.save(function (err) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": [{
                        param: "id",
                        msg: "Could not update user",
                        val: "" + userId
                    }]
                });
            }
        });


        // create newUser from json and previous user
        newUser.language = json.hasOwnProperty('language') ? json.language : history.language;
        newUser.start_time = Date.now();
        newUser.version = history.version++;
        newsUser.contacts = json.hasOwnProperty('contacts') ? json.contacts : history.contacts;
        newsUser.user_roles = json.hasOwnProperty('user_roles') ? json.user_roles : history.user_roles;
        if (json.hasOwnProperty('profile')) {
            var profileProperties = json.profile;
            for (var key in profileProperties) {
                if (profileProperties.hasOwnProperty(key) && key !== "_id") {
                    if (!newUser.hasOwnProperty("profile")) {
                        newUser.profile = {};
                    }
                    newUser.profile[key] = profileProperties[key];
                }
            }
        }

        newUser.login_methods = history.login_methods;
        if (json.hasOwnProperty('login_methods') && json.login_methods.hasOwnProperty('password')) {
            newUser.login_methods.password = bcrypt.hash(json.login_methods.password, 10);
        }

        var user = new UserModel(newUser);
        originalUser.remove();

        // save the newly created prototype to DB
        user.save(function (err, savedUser) {
            if (err) {
                return res.status(500).json({
                    "status": "error",
                    "message": err
                });
            }
            res.status(200).json({
                "status": "ok",
                "userId": savedUser._id
            });
        });

    });
};


module.exports = userController;