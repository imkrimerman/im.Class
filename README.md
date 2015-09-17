# im.Class
Node JS ES5 Classes with 'extend' inheritance

### Installation:
```
npm install --save im.Class
```

### Usage:
Simple Event Class
```js
var Class = require('im.Class').Class
  , EventClass;

EventClass = Class.extend({
  constructor: function(event, data) {
    this.event = event;
    this.data = data;
  }
});

var Event = new EventClass('include', { key: 'value' });

// Can include mixin object
// Any functions found in object will be bound to this
Event.include({
  get: function() {
    return this.data;
  }
});

console.log(Event.get());
// Logs { key: 'value' }
```

Using Emitter Class
```js
var EmitterClass = require('im.Class').EmitterClass
  , Emitter = new EmitterClass()
  , mixin = { mixed: 'Key' };

// Alias for on
Emitter.$when('include', function(data) {
  console.log('$when: ', data.mixin);
});

// Alias for once
Emitter.$after('include', function(data) {
  console.log('$after: ', data.mixin);
});

Emitter.$after('default', function(data) {
  console.log('Default value for data is Emitter that emitted event: ', data === Emitter);
});

// Can include mixin object as Simple Class
Emitter.include(mixin);

// Fire events
Emitter.$fire('include', { mixin: mixin });
Emitter.$fire('include', { mixin: mixin });
Emitter.$fire('default');

// Logs:
// $when: Key
// $after: Key
// $when: Key
// Default value for data is Emitter that emitted event: true 
```

Using Map Class
```js
var Map = require('./index').Map;

var Config = new Map({
  shell: {
    exec: 'async'
  },
  logger: {
    level: 'info',
    transport: 'file'
  }
});

console.log(Config.get('shell.exec'));
// Logs async
Config.set('logger.level', 'debug');
console.log(Config.get('logger.level'));
// Logs debug

Config.forget('logger.transport');
console.log(Config.has('logger.transport'));
// Logs false

Config.forget('shell');
console.log(Config.size());
// Logs 1

// Resets to empty object
Config.reset();
// Resets to provided object
Config.reset({ shell: { exec: 'sync' } });
console.log(Config.all());
// Logs { shell: { exec: 'sync' } }
```
