react-backbone-events
=====================

Define your events in a backbone style annotation

```
$ npm install react-backbone-events
```

###Include it as a ReactJs mixin
Require the react-backbone-events module in your project and include it as a mixin.
Then just specify your events as you would in a Backbone View.

```JavaScript
var reactBackboneEvents = require('react-backbone-events');

var MyClass = React.createClass({
    mixins: [ reactBackboneEvents ],
    events: {
        'click .clickable': 'handleClick'
    },
    handleClick: function (e) {
        console.log('just clicked', e.target);
    },
    render: function () {
        // or use your favourite jsx annotation
        return React.DOM.div(className="clickable");
    }
});
```

###Global Event Bus
This module also offers a global event bus for listening and emitting events at page level.
To **listen to a global** event just add it in your event declaration.
To **emit a global** you can by calling this.global.emit

```JavaScript
var MyClass = React.createClass({
    mixins: [ reactBackboneEvents ],
    events: {
        'global eventName': 'handleGlobalEvent',
        'click .clickable': 'handleClick'
    },
    handleGlobalEvent: function (e) {
        console.log('someone just emitted the global event', e.target);
    },
    handleClick: function (e) {
        this.global.emit('eventName', e);
    },
    render: function () {
        // or use your favourite jsx annotation
        return React.DOM.div(className="clickable");
    }
});
```