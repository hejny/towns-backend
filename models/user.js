var db = require('./db');
var is = require('./validation');

/*
 Changes in this db.Schema should be applied in all object schema files!

 Users - current
 →
 UsersHistory
 + _current_id
 + stoptime

 */

var profileSchema = new db.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        min: 1,
        max: 128,
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

var userSchema = new db.Schema({
    version: {
        type: Number,
        required: true,
        default: 0,
        validate: is.validObjectVersion
    },
    start_time: {
        type: Date,
        required: true,
        default: Date.now,
        validate: is.validCurrentDate
    },
    profile: profileSchema,
    login_methods: {
        password: {
            type: String,
            select: false,
            trim: true,
            required: true,
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
    language: {
        type: String,
        trim: true,
        default: "cs",
        validate: is.validLocale
    }
});

var users = db.model('users', userSchema);
module.exports = users;