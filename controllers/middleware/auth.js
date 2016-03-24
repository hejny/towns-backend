var jwt = require('jwt-simple');
var config = require('./config/server.json');

module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('x-auth')) {
        try {
            req.auth = jwt.decode(req.headers['x-auth'], config.secretKey);
        } catch (err) {
            // TODO: log it or not to log it, that is the question ...
        }
    }
    next()
};