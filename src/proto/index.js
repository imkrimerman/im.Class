'use strict'
var _ = require('lodash');
/***************************************************************************
 *
 * Prototype
 *
 **************************************************************************/
var Prototype = {
  include: require('./include')
};

/**
 * Mix prototype
 * @param {Object} mixin
 * @returns {Object}
 */
module.exports.apply = function(mixin) {
  for (var method in Prototype) {
    if (_.has(mixin, method)) continue;
    mixin[method] = Prototype[method];
  }
  return mixin;
};
