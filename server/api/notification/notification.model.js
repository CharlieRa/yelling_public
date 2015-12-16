'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new Schema({
	fromAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
      // required: true se relaja la condicion
  },
  toAuthor : {
    type: Schema.Types.ObjectId,
    ref: 'User',
      // required: true se relaja la condicion
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  dateTime: { 
  	type: Date, 
  	default: Date.now 
  },
  read : { 
    type : Boolean, 
    default : false }
});

// id: type.string(),
//   title: type.string(),
//   content: type.string(),
//   userId: type.string(),
//   votes: type.number().default(0),
//   dateTime: type.date().default(r.now)
module.exports = mongoose.model('Notification', NotificationSchema);