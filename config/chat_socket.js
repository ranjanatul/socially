const cors = require('cors');
module.exports.chatSockets = function (socketServer) {
  let io = require('socket.io')(socketServer, {
    cors: {
      origin: 'http://localhost:8000',
      Credentials: true,
    },
  });

  io.sockets.on('connection', function (socket) {
    console.log('Connection received', socket.id);

    socket.on('join_room', function (data) {
      console.log('Joining request received', data);

      // this will either create a new if not existing and join the user to that.
      socket.join(data.chatroom);

      io.in(data.chatroom).emit('user_joined', data);

      socket.on('send_message', function (data) {
        io.in(data.chatroom).emit('receive_message', data);
      });
    });

    socket.on('disconnect', function () {
      console.log('chat has been disconnected');
    });
  });
};
