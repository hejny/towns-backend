var jwt = require('jwt-simple');
var server = require('./../../config/server.js');

module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('x-auth')) {
        try {
            req.auth = jwt.decode(req.headers['x-auth'], server.secretKey);
        } catch (err) {
            // TODO: log it or not to log it, that is the question ...
        }
    }
    next()
};