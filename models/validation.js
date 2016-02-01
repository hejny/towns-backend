var check = require('validator');

// checks alpha numeric strings + space
function isAlphanumericstring(value) {
    var valid = value.split(' ').every(function (word) {
        return check.isAlphanumeric(word);
    });
    return valid;
}

// checks valid Type
function typesOfObjects(value) {
    return check.isIn(value, ['building', 'terrain', 'story']);
}

// checks that locale has only alphabet characters
function isAlphabetic(value) {
    return /^[a-zA-Z]*$/i.test(value);
}

// checks that value has two characters
function hasTwoCharacters(value) {
    return value.length === 2 || value.length === 0;
}

function isMongoId(value) {
    // TODO: temporarily allow admin as value, remove after AUTH is implemented
    return check.isMongoId(value) || value == "admin";
}

function isPositiveInteger(value) {
    return check.isInt(value) && value >= 0;
}

function isValidCoordinate(value) {
    return check.isNumeric(value);
}

function isValidDate(value) {
    return check.isDate(value);
}

function isCurrentDate(value) {
    // TODO: sort out this bugged Dates comparing
    return true;
    //return check.isBefore(check.toDate(value), Date.now(-5)) && check.isAfter(check.toDate(value), Date.now(+5))
}

var is = {
    validObjectName: [isAlphanumericstring, '{VALUE} is not alphanumeric'],
    validObjectType: [typesOfObjects, '{VALUE} is not valid TYPE!'],
    validObjectVersion: [isPositiveInteger, '{VALUE} needs to be positive integer'],
    validObjectCoordinate: [isValidCoordinate, '{VALUE} is not valid coordinate'],
    validDate:[
        { 'validator': isValidDate, msg: '{VALUE} is not a date in correct format'},
        { 'validator': isCurrentDate, msg: '{VALUE} is not current date'}
    ],
    validObjectLocale: [
        { 'validator': isAlphabetic, msg: '{VALUE} is not valid locale! Locale must be in ISO 3166-1 alpha-2 format.'},
        {'validator': hasTwoCharacters, msg: '{VALUE} must be 2 characters long'}
    ],
    validOwnerId: [isMongoId, '{VALUE} is not a valid Owner Id']
};

module.exports = is;