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
 * @param {Object} mixin
 * @param {String|null|undefined} key
 * @returns {Object}
 */
module.exports = function(mixin, key) {
  var hasKey = false
    , obj = this;

  mixin = val(mixin, {});
  key = val(key);

  if (key !== val.notDefined && _.has(this, key) && _.isObject(this[key])) {
    hasKey = true;
    obj = _.cloneDeep(this[key]);
  }

  for (var mixinKey in mixin) {
    obj[mixinKey] = mixin[mixinKey];
  }

  if (hasKey) this[key] = obj;

  return this;
};
