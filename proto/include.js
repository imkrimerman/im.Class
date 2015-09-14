'use strict'
var val = require('im.val')
  , _ = require('lodash');
/***************************************************************************
 *
 * Include
 *
 **************************************************************************/
/**
 * Includes mixin to class.
 *
 * @param {Object} object
 * @param {Object} mixin
 * @param {String|null|undefined} key
 * @returns {Object}
 */
module.exports = function(object, mixin, key) {
  var hasKey = false,
    obj = object;

  mixin = val(mixin, {});
  key = val(key, null);

  if (key !== null && _.has(obj, key) && _.isObject(obj[key])) {
    hasKey = true;
    obj = _.clone(object[key]);
  }

  for (var mixinKey in mixin) {
    obj[key] = mixin[mixinKey];
  }

  if (hasKey) object[key] = obj;

  return object;
};