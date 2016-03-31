const util = require('util');
const EventEmitter = require('events');

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

UserEvents.prototype.addInitialResources = function addInitialResources(user)
{
    // TODO: add initial resources from some config file
    console.log('adding initial resources to ' + user.profile.username);
};

UserEvents.prototype.sendWelcomeEmail = function sendWelcomeEmail(user)
{
    // TODO: send some welcoming email to user if email is present
    console.log('Sending welcoming email to ' + user.profile.email);
};

/**
 * Constructing event listener
 * @type {UserEvents}
 */
var userEvents = new UserEvents();
userEvents.on('addInitialResources', userEvents.addInitialResources);
userEvents.on('sendWelcomeEmail', userEvents.sendWelcomeEmail);
module.exports = userEvents;