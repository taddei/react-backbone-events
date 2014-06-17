var $ = require('jquery');
var global = require('./lib/global.js');
var splitEvents = /^(\S+)\s*(.*)$/;
module.exports = {
    global: global,
    _parseEvents: function (events, action) {
        events = events || {};
        for (var key in events) {
            var method = events[key];
            if (!(method instanceof Function)) method = this[events[key]];
            if (!method) continue;
            var match = key.match(splitEvents);
            // If its a global events
            if(match[1] === 'global'){
                this['_' + action + 'GlobalListener'](match[2], method);
            } else {
                this['_' + action + 'DOMListener'](match[1], match[2], method);
            }
        }
    },
    _addDOMListener: function (eventName, selector, listener) {
        $(this.getDOMNode()).on(eventName, selector, listener);
    },
    _removeDOMListener: function (eventName, selector, listener) {
        $(this.getDOMNode()).off(eventName, selector, listener);
    },
    _addGlobalListener: function (selector, listener) {
        globalEvents.on(selector, listener);
    },
    _removeGlobalListener: function (selector, listener) {
        globalEvents.removeListener(selector, listener);
    },
    // add dom event listeners
    componentDidMount: function () {
        this._parseEvents(this.events, 'add');
    },
    // remove dom event listeners
    componentWillUnmount: function () {
        this._parseEvents(this.events, 'remove');
    }
};