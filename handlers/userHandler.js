var UserModel = require('../models/user');
var bcrypt = require('bcrypt');

/**
 * Handler for handling auth tokens
 * @type {{}}
 */
var userHandler = {};


/**
 * Creates new user
 * @param req
 * @param res
 */
userHandler.createUser = function (req, res) {

    var user = new UserModel({"names": {"username": req.body.username}});
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.login_methods = {'password': hash};
        user.save(function (err) {
            if (err) { throw next(err) }
            res.sendStatus(201);
        })
    })
};



module.exports = userHandler;