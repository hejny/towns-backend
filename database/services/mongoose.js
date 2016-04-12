var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mongo = require('../../config/db').mongoDb;

var credentials = (mongo.username !== "" && mongo.password !== "") ? mongo.username + ':' + mongo.password : "";
var uri = mongo.protocol + '//' + credentials + '@' + mongo.host + ':' + mongo.port + '/' + mongo.db;
try {
    mongoose.connect(uri, function () {
        console.log("Connected to " + mongo.db + " @ " + mongo.host);
    });
} catch (e) {
    console.log(e);
}

module.exports = mongoose;