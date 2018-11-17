const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 3000;
const publicpath = path.join(__dirname, '../public');

var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connection', (socket) => {

  console.log("New User Connected");
  // When User Joins the Chat
  socket.emit('newMesage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date()
  });
  // Inform Other chat members that user joined
  socket.broadcast.emit('newMesage', {
    from: 'Admin',
    text: 'New User Joined our Chat',
    createdAt: new Date()
  });
  // When User Creates Message
  socket.on('createMessage', (message) => {
    console.log("Got Message From User: ",JSON.stringify(message, undefined, 2));

    // Send the message to everybody in chat except the user who created the message (Broadcast)
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      to: message.to,
      createdAt: new Date()
    })
  });

  // When user gets disconnected
  socket.on('disconnect', (socket) => {
    console.log("Connection to User was lost");
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
