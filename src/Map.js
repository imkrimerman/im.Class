var Class = require('./Class')
  , _ = require('lodash')
  , val = require('im.val');
/***************************************************************************
 *
 * Map.
 *
 **************************************************************************/
module.exports = Class.extend({

  /**
   * Map constructor.
   */
  constructor: function _Map (items) {
    Class.apply(this);
    this.reset(items);
  },

  /**
   * Returns all.
   * @returns {Object}
   */
  all: function() {
    return this.__items__;
  },

  /**
   * Returns item.
   * @param {String} key - i.e. 'key' or 'key.inner.val'
   * @param {*} defaults - default value that will be returned if key is not exists
   * @returns {*}
   */
  get: function get (key, defaults) {
    return _.get(this.__items__, key, defaults);
  },

  /**
   * Sets item.
   * @param {String} key - i.e. 'key' or 'key.inner.val'
   * @param {*} value - value to set at key
   * @returns {Map}
   */
  set: function set (key, value) {
    _.set(this.__items__, key, value);
    return this;
  },

  /**
   * Push object.
   * @param {Object} object - object to push
   * @returns {Map}
   */
  push: function push (object) {
    if (! _.isObject(object)) return this;
    for(var key in object) {
      this.set(key, object[key]);
    }
    return this;
  },

  /**
   * Checks if Map has variable.
   * @param {String} key - i.e. 'key' or 'key.inner.val'
   * @returns {boolean}
   */
  has: function has (key) {
    return _.has(this.__items__, key);
  },

  /**
   * Forget item.
   * @param {String} key - i.e. 'key' or 'key.inner.val'
   * @returns {Map}
   */
  forget: function forget (key) {
    if (! this.has(key)) return this;
    if (! ~key.indexOf('.') && ! ~key.indexOf('[')) {
      delete this.__items__[key];
    }
    else {
      var path = this.__toPath(key)
        , keys = _.dropRight(path)
        , parent = this.__items__;
      for (var _key in keys) {
        parent = parent[keys[_key]]
      }
      delete parent[_.last(path)];
    }
    return this;
  },

  /**
   * Resets Map with given object.
   * @param {Object} object - object to reset
   * @returns {exports}
   */
  reset: function reset (object) {
    this.__reset(val(object, {}, _.isObject));
    return this;
  },

  /**
   * Returns size of Map
   * @returns {Integer}
   */
  size: function size () {
    return _.size(this.__items__);
  },

  /**
   * Sets inner items to given items.
   * @param {Object} object - object to reset
   * @private
   */
  __reset: function(object) {
    this.__items__ = object;
  },

  /**
   * Converts string path to array
   * @param {String} str - string to convert to path
   * @returns {Array}
   * @private
   */
  __toPath: function(str) {
    var keysArray = str.split('.')
      , path = [];
    for (var key in keysArray) {
      var value = keysArray[key]
        , openBr = value.indexOf('[')
        , closeBr = value.indexOf(']');
      if (~openBr && ~closeBr) {
        var arr = value.slice(0, openBr)
          , index = value.slice(openBr + 1, closeBr)
        path.push(arr);
        path.push(index);
      }
      else path.push(value);
    }
    return path;
  },
});
