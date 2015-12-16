/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var socketUser = {};
// When the user disconnects.. perform this
function onDisconnect(socket) {

  socket.leave();
  console.log('Se desconecta usuario', socket.id);
  console.log('socketUser array : ', socketUser);
}

// When the user connects.. perform this
function onConnect(socket, io) {

  

  // When the client emits 'info', this listens and executes
  socket.on('login', function (user) {
    console.log('[Socket - Login] Llego usuario id:', user._id);
    if (socketUser[user._id]) {
      socketUser[user._id].push(socket.id);
    }else{
      socketUser[user._id] = [];
      socketUser[user._id].push(socket.id);
    }
    
    socket.join(user._id);
    // io.in(user._id).emit('notification','wena');

  });


  // Insert sockets below
  require('../api/notification/notification.socket').register(socket);
  require('../api/feedback/feedback.socket').register(socket);
  require('../api/comment/comment.socket').register(socket,io);
  require('../api/post/post.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));
  var io = socketio;
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.client.conn.id);
    });

    // Call onConnect.
    onConnect(socket, io);
    console.info('[%s] CONNECTED CLIENT', socket.client.conn.id);
  });
};