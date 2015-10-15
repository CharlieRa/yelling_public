/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Post = require('./post.model');

exports.register = function(socket) {
  // thing.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });

  Post.post('save', function(next) {
  	console.log('entre a save');
    onSave(socket, this);
    // next();
	});
  // thing.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
	
}

function onSave(socket, doc, cb) {
	console.log('emitiendo save a front con :', doc);
  socket.emit('post:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('post:remove', doc);
}