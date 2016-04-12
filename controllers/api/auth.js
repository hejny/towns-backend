var UserModel = require('../../database/models/user');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var server = require('../../config/server');

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var authController = {};

/**
 * Creates token
 * @param req
 * @param res
 * @returns {*}
 */
authController.createToken = function (req, res) {

    if ((typeof req.body.username == 'undefined') || (typeof req.body.password == 'undefined')) {
        var msgs = [];
        if (typeof req.body.username == 'undefined') {
            msgs[msgs.length] = {
                param: "username",
                msg: "Username must be present",
                val: ""
            };
        }

        if (typeof req.body.password == 'undefined') {
            msgs[msgs.length] = {
                param: "password",
                msg: "Password must be present",
                val: ""
            };
        }

        return res.status(400).json({
            "status": "error",
            "message": msgs
        });
    }

    UserModel.findOne({'profile.username': req.body.username}).select('login_methods.password').exec(function (err, user) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "Problem getting user's password",
                    val: "" + req.body.username
                }]
            });
        }

        if (user === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "There is no such user",
                    val: "" + req.body.username
                }]
            });
        }

        bcrypt.compare(req.body.password, user.login_methods.password, function (bcryptError, valid) {
            if (bcryptError) {
                return res.status(400).json({
                    "status": "error",
                    "message": [{
                        param: "password",
                        msg: "Problem validating password",
                        val: "" + req.body.password
                    }]
                });
            }

            if (!valid) {
                return res.status(400).json({
                    "status": "error",
                    "message": [{
                        param: "password",
                        msg: "The password is not correct for the given user",
                        val: "" + req.body.password
                    }]
                });
            }

            var token = jwt.encode(
                {
                    id: user._id,
                    username: req.body.username
                },
                server.secretKey);
            return res.status(200).json({
                'x-auth': token
            });
        });
    })
};

/**
 * Check the status of token
 * @param res
 * @param req
 */
authController.getStatus = function (req, res) {
    return res.status(200).json({
        "status": "ok"
    });
};

module.exports = authController;