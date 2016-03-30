var db = require('./services/db');
var is = require('./services/validation');

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
        default: "admin",
        validate: is.validOwnerId
    },
    resources: {
        wood: {
            type: Number,
            default: 0,
            validate: is.validReource
        },
        clay: {
            type: Number,
            default: 0,
            validate: is.validReource
        },
        iron: {
            type: Number,
            default: 0,
            validate: is.validReource
        },
        stone: {
            type: Number,
            default: 0,
            validate: is.validReource
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
    collection: 'reources',
    versionKey: "_version"
});

var resources = db.model('resources', resourcesSchema, 'reources');
module.exports = resources;