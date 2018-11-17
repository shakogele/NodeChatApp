var socket = io();

socket.on('connect', () => {
  console.log("Connected to server");
});

socket.emit('createMessage', {
  to: "admin",
  from: "user"
})

socket.on('newMessage', (message) => {
  console.log('message: ', message)
})

socket.on('disconnect', () => {
  console.log('Connection to server lost');
})
