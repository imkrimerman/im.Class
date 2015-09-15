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
  constructor: function(items) {
    Class.apply(this);
    this.reset(items);
  },

  /**
   * Returns item.
   * @param {String} key - i.e. 'key' or 'key.inner.val'
   * @param {*} defaults
   * @returns {*}
   */
  get: function(key, defaults) {
    return _.get(this.__items__, key, defaults);
  },

  /**
   * Sets item.
   * @param key
   * @param value
   * @returns {Object}
   */
  set: function(key, value) {
    _.set(this.__items__, key, value);
    return this;
  },

  /**
   * Push items.
   * @param key
   * @param value
   * @returns {Object}
   */
  push: function(items) {
    if (! _.isObject(items)) return this;
    for(var key in items) {
      this.set(key, items[key]);
    }
    return this;
  },

  /**
   * Checks if Map has variable.
   * @param {String} key
   * @returns {boolean}
   */
  has: function(key) {
    return _.has(this.__items__, key);
  },

  /**
   * Forget item
   * @param {String} key
   * @returns {exports}
   */
  forget: function(key) {
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
   * Resets Map.
   * @param {Object} items
   * @returns {exports}
   */
  reset: function(items) {
    if (val(items) !== val.notDefined && _.isObject(items)) {
      this.__reset(items);
    }
    else this.__reset({});
    return this;
  },

  /**
   * Sets inner items to given items.
   * @param Object object
   * @private
   */
  __reset: function(object) {
    this.__items__ = object;
  },

  /**
   * Converts string path to array
   * @param str
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
