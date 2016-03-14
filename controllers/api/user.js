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

    var user = new UserModel({"names": {"username": req.body.username}});
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.login_methods = {'password': hash};
        user.save(function (err) {
            if (err) { throw next(err) }
            res.sendStatus(201);
        })
    })
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