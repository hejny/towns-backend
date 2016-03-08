var db = require('./db');
var is = require('./validation');

/*
 Changes in this db.Schema should be applied in all object schema files!

 Users - current
 →
 UsersHistory

 */

var profileSchema = new db.Schema({
    username: String,
    name: String,
    surname: String,
    email: String
});

var loginMethodsSchema = new db.Schema( {
    password: {
        type: String,
        select: false,
        max: 60,
        validate: is.validBcryptHash
    },
    google: String,
    facebook: String,
    twitter: String
});

var schema = new db.Schema({
    version: {
        type: Number,
        required: true,
        default: 0,
        validate: is.validObjectVersion
    },
    names: profileSchema,
    login_methods:loginMethodsSchema,
    contacts: {
        type: Array
    },
    user_roles: {
        type: Array
    },
    languages: {
        type: String,
        trim: true,
        default: "cs",
        validate: is.validObjectLocale
    }
});

var user = db.model('users', schema);
module.exports = user;