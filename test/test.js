'use strict'
var assert = require('assert')
  , equal = assert.equal
  , classes = require('../index')
  , _ = require('lodash')
  , EventEmitter = require('events').EventEmitter;

describe('im.Class', function() {

  it('Should create both valid Classes', function() {
    var Class = new classes.Class()
      , EventClass = new classes.EventClass();

    equal(true, Class instanceof classes.Class);
    equal(true, EventClass instanceof classes.EventClass);
    equal(true, _.contains(_.methods(EventClass), 'emit', 'on', 'once'));
  });

  it('Should extend both Classes', function() {
    var newClass = classes.Class.extend({
        newMethod: function() {}
      })
      , newEventClass = classes.EventClass.extend({
        newMethod: function() {}
      })
      , classMethods = _.methods(new newClass())
      , eventClassMethods = _.methods(new newEventClass());

    equal(true, _.contains(classMethods, 'newMethod'));
    equal(true, _.contains(eventClassMethods, 'newMethod'));
  });

  it('Should have working include method', function() {
    var Class = new classes.Class()
      , EventClass = new classes.EventClass()
      , classMethods = _.methods(Class)
      , eventClassMethods = _.methods(EventClass);

    equal(true, _.contains(classMethods, 'include'));
    equal(true, _.contains(eventClassMethods, 'include'));

    Class.include({
      mixin: 'new',
      methods: {}
    });

    EventClass.include({
      mixin: 'new'
    });

    equal(true, _.has(Class, 'mixin'));
    equal(true, _.has(EventClass, 'mixin'));

    Class.include({
      foo: function() {}
    }, 'methods');

    equal(true, _.has(Class.methods, 'foo'));
  });

  it('EventClass should emit events using $fire method', function(done) {
    var EventClass = new classes.EventClass();
    EventClass.on('event', function(self) {
      equal(EventClass, self);
      done()
    });
    EventClass.$fire('event');
  });

  it('Should create working Map', function() {
    var Map = new classes.Map();
    equal(true, Map instanceof classes.Map);
    var value = 10;
    Map.set('key', value);
    Map.set('key.inner', value);
    equal(value, Map.get('key'));
    equal(undefined, Map.get('key.inner'));
    equal(true, Map.has('key'));
    equal(false, Map.has('key.inner'));
    Map.forget('key');
    equal(false, Map.has('key'));

    Map = new classes.Map({
      key: { inner: 'value', arr: [] }
    });
    Map.set('key.inner', value);
    Map.set('key.arr[0]', { one: 'object' });
    equal('object', Map.get('key.arr[0].one'));
    equal(value, Map.get('key.inner'));
    equal(true, Map.has('key.arr[0]'));
    equal(true, Map.has('key.inner'));
    Map.forget('key.inner');
    Map.forget('key.arr[0].one');
    equal(false, Map.has('key.inner'));
    equal(false, Map.has('key.arr[0].one'));
    Map.forget('key.arr');
    equal(false, Map.has('key.arr'));
  });
});
