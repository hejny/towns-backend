const util = require('util');
const EventEmitter = require('events');
var ResourcesModel = require('../models/resources');

/**
 * Event Handler
 * @constructor
 */
function UserEvents() {
    EventEmitter.call(this);
}

// The prototype of userManager will be set to a new object created from EventEmitter.
util.inherits(UserEvents, EventEmitter);

/**
 * Trigger list when user registers
 * @param user
 */
UserEvents.prototype.hasRegistered = function(user) {
    this.emit('addInitialResources', user);
    this.emit('sendWelcomeEmail', user);
};

UserEvents.prototype.addInitialResources = function addInitialResources(user, callback)
{
    // TODO: add initial resources from some config file
    console.info('Event: adding initial resources to ' + user.profile.username);
    var initialResources = {
        "owner": user._id,
        "resources": {
            "clay": 10000,
            "wood": 10000,
            "stone": 10000,
            "iron": 10000
        },
        "reference": "adding initial resources"
    };
    
    var resources = new ResourcesModel(initialResources);
    resources.save(function(err, savedResource) {
        if (err) {
           console.log(err);
        }
        // Make sure the callback is a function​
        if (typeof callback === "function") {
            callback(err, savedResource);
        }
    });
    
};

UserEvents.prototype.sendWelcomeEmail = function sendWelcomeEmail(user)
{
    console.info('Event: Sending welcoming email to ' + user.profile.email);
    // TODO: send some welcoming email to user if email is present
};

/**
 * Constructing event listener
 * @type {UserEvents}
 */
var userEvents = new UserEvents();
userEvents.on('addInitialResources', userEvents.addInitialResources);
userEvents.on('sendWelcomeEmail', userEvents.sendWelcomeEmail);
module.exports = userEvents;