var util = require('util');
var EventEmitter = require('events').EventEmitter;

var EventBus = function EventBus(){
    EventEmitter.call(this);
};

util.inherits(EventBus, EventEmitter);

module.exports = EventBus;