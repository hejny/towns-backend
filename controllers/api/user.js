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
    if( req.body.username == null || req.body.username == "" ) {
        res.status(400).json({
            "status": "error",
            "message": [{
                param: "username",
                msg: "Username is required",
                val: ""
            }]
        });
    }

    if( req.body.password == null || req.body.password == "") {
        res.status(400).json({
            "status": "error",
            "message": [{
                param: "password",
                msg: "Password is required",
                val: ""
            }]
        });
    }

    // check if user exist and if not then create it.
    UserModel.findOne({"names.username": req.body.username}, function( err, user) {
        if (err) {
            return next(err);
        }
        if (user == null) {
            user = new UserModel({"names": {"username": req.body.username}});
            bcrypt.hash(req.body.password, 10, function (bcryptError, hash) {
                if (bcryptError) { throw next(bcryptError) }
                user.login_methods = {'password': hash};
                user.save(function (saveError) {
                    if (saveError) { throw next(saveError) }
                    res.sendStatus(201);
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