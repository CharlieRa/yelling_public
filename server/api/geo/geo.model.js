'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GeoSchema = new Schema({
  name: String,
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  }
})

module.exports = mongoose.model('Geo', GeoSchema);