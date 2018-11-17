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
});

io.on('disconnect', (socket) => {
  console.log("Connection to User was lost");
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
