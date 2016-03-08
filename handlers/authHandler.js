var User = require('../models/user');
var check = require('validator');
var jwt = require('jwt-simple');
var _ = require('lodash');

// TODO: maybe move out to config
var secretKey = "someultrasup3r5ecreth4shk3yw1thsom354lt";

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var authHandler =  {};

function findUserByUsername(username) {
    console.log(username);
    User.findOne({"names.username": username}, function (err, user) {
        if(err){
            console.log(err);
        }
        console.log(user);

        return user;
    });
}

function validateUser(user, password) {
    console.log(user);
    //return user.login_methods.password === password
}

/**
 * Returns user details of authorized user
 * @param req
 * @param res
 */
authHandler.getUser = function (req, res) {

    var token = req.headers['x-auth'];
    var userFromToken = jwt.decode(token, secretKey);

    User.findOne({"names.username": userFromToken.username}, function (err, user) {

        if (err) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "Problem getting user details",
                    val: userFromToken.username
                }]
            });
        }

        if (object === null) {
            return res.status(400).json({
                "status": "error",
                "message": [{
                    param: "username",
                    msg: "There is no user associated with that token",
                    val: ""+userFromToken.username
                }]
            });
        }

        if (userFromToken.password !== user.password) {
            res.sendStatus(401); // Unauthorized
        }
        res.json(user);
    });
};

/**
 * Creates token
 * @param req
 * @param res
 */
authHandler.createToken = function (req, res) {
    var user = findUserByUsername(req.body.username);
    if (!validateUser(user, req.body.password)) {
        return res.sendStatus(401); // Unauthorized
    }
    var token = jwt.encode({"user.names.username": username}, secretKey);
    res.json(token);

};

module.exports = authHandler;