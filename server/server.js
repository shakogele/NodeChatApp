const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 3000;
const publicpath = path.join(__dirname, '../public');

var io = socketIO(server);

app.use(express.static(publicpath));

io.on('connection', (socket) => {

  console.log("New User Connected");
  // When User Joins the Chat
  socket.emit('newMesage', generateMessage('Admin', 'New User Connected'));
  // Inform Other chat members that user joined
  socket.broadcast.emit('newMesage', generateMessage('Admin', 'New User Joined the Chat'));
  // When User Creates Message
  socket.on('createMessage', (message) => {
    console.log("Got Message From User: ",JSON.stringify(message, undefined, 2));

    // Send the message to everybody in chat except the user who created the message (Broadcast)
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
  });

  // When user gets disconnected
  socket.on('disconnect', (socket) => {
    console.log("Connection to User was lost");
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
