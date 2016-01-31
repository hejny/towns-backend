var validator = require('validator');

// checks alpha numeric strings + space
function isAlphanumericstring(value) {
    //return validator.isAlphanumeric(value);
    return /^[a-zA-Z0-9 ]+$/i.test(value);
}

// checks valid Type
function typesOfObjects(value) {
    return validator.isIn(value, ['building', 'terrain', 'story']);
}

// checks that locale has only alphabet characters
function isAlphabetic(value) {
    return /^[a-zA-Z]*$/i.test(value);
}

// checks that value has two characters
function hasTwoCharacters(value) {
    return value.length == 2 || value.length == 0;
}

function isMongoId(value) {
    // TODO: temporarily allow admin as value
    return validator.isMongoId(value) || value == "admin";
}

var is = {
    validObjectName: [isAlphanumericstring, '{VALUE} is not alphanumeric'],
    validObjectType: [typesOfObjects, '{VALUE} is not valid TYPE!'],
    validObjectLocale: [
        { 'validator': isAlphabetic, msg: '{VALUE} is not valid locale! Locale must be in ISO 3166-1 alpha-2 format.'},
        {'validator': hasTwoCharacters, msg: '{VALUE} must be 2 characters long'}
    ],
    validOwnerId: [isMongoId, '{VALUE} is not a valid Owner Id']
};

module.exports = is;