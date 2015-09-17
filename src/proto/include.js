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
 * @param {Object} mixin - object to mix with
 * @param {String|null|undefined} key - if provided will be mixed with given value of key
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
    var mixinValue = mixin[mixinKey];
    if (_.isFunction(mixinValue)) {
      mixinValue = mixinValue.bind(this);
    }
    obj[mixinKey] = mixinValue;
  }

  if (hasKey) this[key] = obj;

  return this;
};
