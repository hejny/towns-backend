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

var usersHistorySchema = new db.Schema({
    version: {
        type: Number,
        required: true,
        default: 0,
        validate: is.validObjectVersion
    },
    _current_id: {
        type: String,
        required:true,
        trim: true,
        validate: is.validObjectId
    },
    start_time: {
        type: Date,
        required: true,
        validate: is.validDate
    },
    stop_time: {
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
});

var usersHistory = db.model('usersHistory', usersHistorySchema);
module.exports = usersHistory;