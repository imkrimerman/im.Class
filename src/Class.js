'use strict'
var extend = require('class-extend').extend
  , Proto = require('./proto');
/***************************************************************************
 *
 * Class
 *
 **************************************************************************/
/**
 * Class
 * @constructor
 */
function Class () {};

/**
 * Inheritance method
 */
Class.extend = extend;

/**
 * Wrapped Class
 */
module.exports = Class.extend(Proto.apply({

  /**
   * Class Constructor.
   */
  constructor: function _Class () {
    Class.call(this);
  }

}));
