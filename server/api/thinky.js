/**
 * Thinky RethinkDB ORM configuration
 */

'use strict';

var config = require('../config/environment');

var thinky = require('thinky')(config.rethink.options)

module.exports = thinky;