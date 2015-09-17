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
function EmitterClass () {
  EventEmitter.call(this);
};

/**
 * Extend EmitterClass prototype from EventEmitter prototype
 */
_.extend(EmitterClass.prototype, EventEmitter.prototype);

/**
 * Inheritance method
 */
EmitterClass.extend = extend;

/**
 * Wrapped Event Class
 */
module.exports = EmitterClass.extend(Proto.apply({

  /**
   * EmitterClass Constructor.
   */
  constructor: function _EmitterClass () {
    EmitterClass.call(this);
  },

  /**
   * Fire event.
   * @param {String} event - event to fire
   * @param {*} data - will be emitted with event, if not provided will be set to this
   * @returns {EmitterClass}
   */
  $fire: function $fire (event, data) {
    if (! _.isString(event)) return this;
    if (val(data) === val.notDefined) data = this;
    this.emit(event, data);
    return this;
  },

  /**
   * Alias for Event Emitter 'on' method
   * @param {String} event - event name to listen
   * @param {Function} cb - callback to invoke on event
   * @returns {EmitterClass}
   */
  $when: function $when (event, cb) {
    if (! _.isString(event)) return this;
    this.on(event, val(cb, _.noop, _.isFunction));
    return this;
  },

  /**
   * Alias for Event Emitter 'once' method
   * @param {String} event - event name to listen
   * @param {Function} cb - callback to invoke on event
   * @returns {EmitterClass}
   */
  $after: function $after (event, cb) {
    if (! _.isString(event)) return this;
    this.once(event, val(cb, _.noop, _.isFunction));
    return this;
  },

}));
