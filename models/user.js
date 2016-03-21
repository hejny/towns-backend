var db = require('./services/db');
var is = require('./services/validation');
var profileSchema = require('./schemas/profile');

/*
 Changes in this db.Schema should be applied in all object schema files!

 Users - current
 →
 UsersHistory
 + _current_id
 + stoptime

 */

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
        lowercase: true,
        validate: is.validLocale
    }
}, {
    versionKey: "_version"
});

var users = db.model('users', userSchema);
module.exports = users;