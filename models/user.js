var db = require('./db');
var is = require('./validation');

/*
 Changes in this db.Schema should be applied in all object schema files!

 Users - current
 →
 UsersHistory

 */

var userSchema = new db.Schema({
    version: {
        type: Number,
        required: true,
        default: 0,
        validate: is.validObjectVersion
    },
    names: {
        username: {type: String},
        name: {type: String},
        surname: {type: String},
        email: {type: String}
    },
    login_methods: {
        password: {
            type: String,
            select: false,
            max: 60,
            validate: is.validBcryptHash
        },
        google: {type: String},
        facebook: {type: String},
        twitter: {type: String}
    },
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

var users = db.model('users', userSchema);
module.exports = users;