'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: String,
	author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true se relaja la condicion
  },
  post: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  dateTime: { 
  	type: Date, 
  	default: Date.now 
  },
});


module.exports = mongoose.model('Comment', CommentSchema);