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
});
