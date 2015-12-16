/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Comment = require('./comment.model');
var Notification = require('../notification/notification.model');
var Post = require('../post/post.model');
var moment = require('moment');

moment().format();
var oldTime  = 0;

exports.register = function(socket, io) {
  Comment.schema.post('save', function (doc) {
  	
    
    var newTime = moment(doc.dateTime).valueOf();
	  
	  if (oldTime != newTime) {
		  console.log('[Socket - onSave ] Mandando a socket con :', doc);
		  onSave(socket, io, doc);
		  oldTime = newTime;
	  }else{
	  	return false;
	  }
  });

  Comment.schema.post('remove', function (doc) {

    onRemove(socket, doc);
  });
}

function onSave(socket, io, doc, cb) {

	console.log('[Socket - onSave ] Enviando a Front ');

  Post
    .findById(doc.post.id)  
    .exec(function (err, post) {
		if (err) next(err);
			console.log('Enviando notificacion a author', post.author);

			var notification = {};
			notification.fromAuthor = doc.author;
			notification.toAuthor = post.author;
			notification.post = doc.post.id;
		  
		  Notification.create(notification, function(err, notifi) {
		    if(err) { return handleError(res, err); }
		    console.log('Se creo nueva notifiacion:', notifi);
		  });
			io.in(post.author).emit('notification',post);
	});

  // socket.emit('post:save', doc);


}

function onRemove(socket, doc, cb) {
  socket.emit('comment:remove', doc);
}