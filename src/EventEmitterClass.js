'use strict'
var EventEmitter = require('events').EventEmitter
  , val = require('im.val')
  , extend = require('class-extend').extend
  , _ = require('lodash')
  , Proto = require('./proto');
/***************************************************************************
 *
 * Event Class
 *
 **************************************************************************/
/**
 * Event Class
 * @constructor
 */
function EventEmitterClass () {
  EventEmitter.call(this);
};

/**
 * Extend EventEmitterClass prototype from EventEmitter prototype
 */
_.extend(EventEmitterClass.prototype, EventEmitter.prototype);

/**
 * Inheritance method
 */
EventEmitterClass.extend = extend;

/**
 * Wrapped Event Class
 */
module.exports = EventEmitterClass.extend(Proto.apply({

  /**
   * EventEmitterClass Constructor.
   */
  constructor: function _EventClass () {
    EventEmitterClass.call(this);
  },

  /**
   * Fire event.
   * @param {String} event
   * @param {*} data
   * @returns {EventEmitterClass}
   */
  $fire: function(event, data) {
    if (! _.isString(event)) return this;
    if (val(data) === val.notDefined) data = this;
    this.emit(event, data);
    return this;
  },

  /**
   * Alias for Event Emitter 'on' method
   * @param {String} event
   * @param {Function} cb
   * @returns {EventEmitterClass}
   */
  $when: function(event, cb) {
    if (! _.isString(event)) return this;
    this.on(event, val(cb, _.noop, _.isFunction));
    return this;
  },

  /**
   * Alias for Event Emitter 'once' method
   * @param {String} event
   * @param {Function} cb
   * @returns {EventEmitterClass}
   */
  $after: function(event, cb) {
    if (! _.isString(event)) return this;
    this.once(event, val(cb, _.noop, _.isFunction));
    return this;
  },

}));
