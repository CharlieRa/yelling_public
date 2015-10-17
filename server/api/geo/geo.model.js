'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GeoSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Geo', GeoSchema);