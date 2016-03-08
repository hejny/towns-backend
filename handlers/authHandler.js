var UserModel = require('../models/user');
var check = require('validator');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

// TODO: maybe move out to config
var secretKey = "someultrasup3r5ecreth4shk3yw1thsom354lt";

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var authHandler = {};

/**
 * Creates token
 * @param req
 * @param res
 */
authHandler.createToken = function (req, res) {

    UserModel.findOne({'names.username': req.body.username}).select('password').exec( function (err, user) {
        if (err) {
            return res.status(401).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "Problem getting user",
                    val: req.body.username
                }]
            });
        }

        if (!user) {
            return res.status(401).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "There is no such user",
                    val: "" + req.body.username
                }]
            });
        }

        bcrypt.compare(req.body.password, user.login_methods.password, function (err, valid) {
            if (err || !valid) {
                return res.sendStatus(401); // Unauthorized
            }

            var token = jwt.encode({username: user.names.username}, secretKey);
            res.json(token);
        });

    });

};

/**
 * Returns user details of authorized user
 * @param req
 * @param res
 */
authHandler.getUser = function (req, res) {

    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, secretKey);

    UserModel.findOne({'names.username': auth.username}, function( err, user) {
        if (err) {
            return res.status(401).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "Problem getting user",
                    val: auth.username
                }]
            });
        }

        if (!user) {
            return res.status(401).json({
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

module.exports = authHandler;