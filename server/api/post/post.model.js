'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  content: String,
	author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  location: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2dsphere',      // create the geospatial index
    required: true
  },
  votes: {
  	type: Number, 
  	default: 0
  },
  dateTime: { 
  	type: Date, 
  	default: Date.now 
  },
});

// id: type.string(),
//   title: type.string(),
//   content: type.string(),
//   userId: type.string(),
//   votes: type.number().default(0),
//   dateTime: type.date().default(r.now)
module.exports = mongoose.model('Post', PostSchema);