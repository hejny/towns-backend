var db = require('./../services/db');
var is = require('./../services/validation');

// profile schema is used in following models:
// - user

var profileSchema = new db.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        min: 1,
        max: 64,
        validate: is.validUsername
    },
    name: {type: String},
    surname: {type: String},
    birthday: {
        type: Date,
        default: Date.now,
        validate: is.validDate
    },
    description: {type: String},
    image: {type: String},
    email: {type: String}
});

module.exports = profileSchema;