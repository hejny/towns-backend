var jwt = require('jwt-simple');
var server = require('../../config/server');
var UserModel = require('../../models/user');

/**
 * Middleware for authentications 
 * @type {{}}
 */
var auth = {};

/**
 * checks that token is valid, set it into req.user and proceed to next step
 * otherwise throws 401 Unauthorized error.
 * @param req
 * @param res
 * @param next
 */
auth.check = function (req, res, next) {
    console.log(req.auth);
    UserModel.findOne({'profile.username': req.auth.username}, function (err, user) {
        if (err) {
            return res.sendStatus(401);
        }

        if (!user) {
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    });
};

/**
 * Gets the token from request, decodes it if possible and set req.username
 * @param req
 * @param res
 * @param next
 */
auth.decodeToken = function (req, res, next) {
    if (req.headers.hasOwnProperty('x-auth')) {
        try {
            req.auth = jwt.decode(req.headers['x-auth'], server.secretKey);
        } catch (err) {
            req.auth = {
                username: ''
            };
            // TODO: count unsuccessful requests and ban for 5 minutes if more than 10 invalid requests were sent
        }
    } else {
        req.auth = {
            username: ''
        };
    }
    next()
};

module.exports =  auth;