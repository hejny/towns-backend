var UserModel = require('../../models/user');
var check = require('validator');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../../config/server.json');

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var authController = {};

/**
 * Creates token
 * @param req
 * @param res
 * @param next
 */
authController.createToken = function (req, res, next) {
    if((typeof req.body.username == 'undefined') || (typeof req.body.password == 'undefined')) {
        return res.status(400).json({
            "status": "error",
            "message": [{
                param: "body",
                msg: "username and password must be present",
                val: ""
            }]
        });
    }

    UserModel.findOne({'names.username': req.body.username}).select('login_methods.password').exec( function (err, user) {
        if (err) {
            return next(err);
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
            if(bcryptError) {
                return next(bcryptError);
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

            var token = jwt.encode({username: req.body.username}, config.secretKey);
            res.status(200).json(token);
        });
    })
};

module.exports = authController;