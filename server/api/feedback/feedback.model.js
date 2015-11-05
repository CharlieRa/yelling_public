'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  content: String,
  votes: {
  	type: Number, 
  	default: 0
  },
  dateTime: { 
  	type: Date, 
  	default: Date.now 
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);