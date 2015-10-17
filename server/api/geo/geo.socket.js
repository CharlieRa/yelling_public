/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Geo = require('./geo.model');

exports.register = function(socket) {
  Geo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Geo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('geo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('geo:remove', doc);
}