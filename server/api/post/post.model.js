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
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Geo',
      required: true
    }
  },
  votes: Number,
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