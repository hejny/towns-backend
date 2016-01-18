// checks alpha numeric strings + space
function isAlphanumeric(value) {
    return /^[a-zA-Z0-9 ]+$/i.test(value);
}

// checks valid Type
function isValidType(value) {
    return /building|terrain|story/i.test(value);
}

// checks that locale has only alphabet characters
function isAlphabetic(value) {
    return /^[a-zA-Z]*$/i.test(value);
}

// checks that value has two characters
function hasTwoCharacters(value) {
    return value.length == 2 || value.length == 0;
}

var validation = {
    alphanumeric: [isAlphanumeric, '{VALUE} is not alphanumeric'],
    validType: [isValidType, '{VALUE} is not valid type!'],
    validLocale: [{ 'validator': isAlphabetic, msg: '{VALUE} is not valid locale! Locale must be in ISO 3166-1 alpha-2 format.'}, {'validator': hasTwoCharacters, msg: '{VALUE} must be 2 characters long'}]
};

module.exports = validation;