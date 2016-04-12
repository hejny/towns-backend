var db = require('./../services/db');
var is = require('./../services/validation');

var resourcesSchema = new db.Schema({
    version: {
        type: Number,
        required: true,
        default: 0,
        validate: is.validObjectVersion
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
        validate: is.validCurrentDate
    },
    owner: {
        type: String,
        required: true,
        trim: true,
        validate: is.validOwnerId
    },
    resources: {
        wood: {
            type: Number,
            default: 0,
            validate: is.validResource
        },
        clay: {
            type: Number,
            default: 0,
            validate: is.validResource
        },
        iron: {
            type: Number,
            default: 0,
            validate: is.validResource
        },
        stone: {
            type: Number,
            default: 0,
            validate: is.validResource
        }
    },
    reference: {
        type: String,
        trim: true,
        select: false,
        default: "checked balance",
        validate: is.validObjectName
    }
}, {
    collection: 'resources',
    versionKey: "_version"
});

var resources = db.model('resources', resourcesSchema, 'resources');
module.exports = resources;