'use strict'
var EventEmitter = require('events').EventEmitter
  , val = require('im.val')
  , extend = require('class-extend').extend
  , _ = require('lodash')
  , Proto = require('./proto');
/***************************************************************************
 *
 * Classes
 *
 **************************************************************************/
/**
 * Class
 * @constructor
 */
function Class () {};

/**
 * EventClass
 * @constructor
 */
function EventClass () {
  EventEmitter.call(this);
};

/**
 * Extend EventClass prototype from EventEmitter prototype
 */
_.extend(EventClass.prototype, EventEmitter.prototype);

/**
 * Inheritance method
 */
Class.extend = EventClass.extend = extend;

/**
 * Base EventClass
 */
var EventClass_ = EventClass.extend(Proto.apply({

  /**
   * EventClass Constructor.
   */
  constructor: function _EventClass () {
    EventClass.call(this);
    this.$fire('constructed');
  },

  /**
   * Fire event with provided Event Emitter.
   * @param {EventEmitter} emitter
   * @param {String} event
   * @param {*} data
   * @returns {undefined}
   */
  $fire: function(event, data) {
    if (! _.isString(event)) return;
    if (val(data) === val.notDefined) data = this;
    this.emit(event, data);
  }

}));

/**
 * Class
 */
var Class_ = Class.extend(Proto.apply({

  /**
   * Class Constructor.
   */
  constructor: function _Class () {
    Class.call(this);
  }

}));

/**
 * Export Classes
 */
module.exports = {
  Class: Class_,
  EventClass: EventClass_
};