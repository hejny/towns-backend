var check = require('validator');

// checks alpha numeric strings + space
function isAlphanumericstring(value) {
    // to prevent XSS we check only that it doesn't contain dangerous characters
    return value === check.escape(value);
}

// checks valid Type
function typesOfObjects(value) {
    return check.isIn(value, ['building', 'terrain', 'story']);
}

//checks the valid Subtype
function subtypesOfObjects(value) {
    // todo: define what subtypes are allowed
    return true;
}

// checks that locale has only alphabet characters
function isAlphabetic(value) {
    return /^[a-zA-Z]*$/i.test(value);
}

// checks that value has two characters
function hasTwoCharacters(value) {
    return value.length === 2 || value.length === 0;
}

// currently we support only czech and english language. We will support more locales at later stages
// null is allowed too, because mongoose will set the defualt value
function isValidLocale(value) {
    return check.isIn(value, ['cs', 'en', null]);
}

function isMongoId(value) {
    return check.isMongoId(value);
}

function isPositiveInteger(value) {
    return check.isInt(value) && value >= 0;
}

function isValidCoordinate(value) {
    return check.isFloat(value.valueOf());
}

function isValidDate(value) {
    return check.isDate(value);
}

function isCurrentDate(value) {
    var beforeDate = new Date();
    var afterDate = new Date();
    beforeDate.setSeconds(beforeDate.getSeconds()-5);
    afterDate.setSeconds(afterDate.getSeconds()+5);
    return check.isBefore(beforeDate, value) && check.isAfter(afterDate, value);
}

function isObjectId(value) {
    return check.isMongoId(value);
}

function isBcryptHash(value) {
    return /^\$2[ayb]\$.{56}$/i.test(value);
}

function isValidUsername(value) {
    return value !== null && value.length > 0 && value.length <= 64 && value === check.escape(value);
}

function isValidPassword(value) {
    return value !== null && value.length > 0 && value === check.escape(value);
}

function isValidResource(value) {
    return check.isInt(value)
}

var is = {
    validObjectName: [isAlphanumericstring, '{VALUE} is not alphanumeric'],
    validObjectType: [typesOfObjects, '{VALUE} is not valid TYPE!'],
    validObjectSubType: [subtypesOfObjects, '{VALUE} is not valid SUBTYPE!'],
    validObjectVersion: [isPositiveInteger, '{VALUE} needs to be positive integer'],
    validObjectCoordinate: [isValidCoordinate, '{VALUE} is not valid coordinate. Coordinate must be float number.'],
    validDate: [ isValidDate, '{VALUE} is not a date in correct format' ],
    validCurrentDate: [
        { 'validator': isValidDate, msg: '{VALUE} is not a date in correct format'},
        { 'validator': isCurrentDate, msg: '{VALUE} is not current date'}
    ],
    validLocale: [
        { 'validator': isAlphabetic, msg: '{VALUE} is not valid locale! Locale must be in ISO 3166-1 alpha-2 format.', type: 'ISO 3166-1 alpha-2 format required'},
        { 'validator': hasTwoCharacters, msg: '{VALUE} must be 2 characters long', type: 'length'},
        { 'validator': isValidLocale, msg: '{VALUE} is not valid locale', type: 'not allowed value'}
    ],
    validOwnerId: [isMongoId, '{VALUE} is not a valid Owner Id'],
    validObjectId: [isObjectId, '{VALUE} is not a valid Object Id'],
    validBcryptHash: [isBcryptHash, '{VALUE} is not a bcrypt hash'],
    validUsername: [
        { 'validator': isValidUsername, msg: '{VALUE} is not valid username', type: "invalid username" }
    ],
    validPassword: [isValidPassword, '{VALUE} is not valid password'],
    validResource: [isValidResource, '{VALUE} is not valid resource']
};

module.exports = is;