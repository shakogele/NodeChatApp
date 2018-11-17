var socket = io();

socket.on('connect', () => {
  console.log("Connected to server");
});

socket.emit('createMessage', {
  to: "admin",
  text: "New user joined the chat",
  from: "user"
}, (serverMessage) => {
  console.log("Got Message From Server, ", serverMessage);
})

socket.on('newMessage', (message) => {
  let userMessage = `<div class="chatMessage">${message.from}: ${message.text}</div>`;
  $('#chatWindow').append(userMessage);
})

socket.on('disconnect', () => {
  console.log('Connection to server lost');
})

$('#chatId').on('submit', (e) => {
  e.preventDefault();
  let message = $('#text').val();
  $('#text').val('');
  socket.emit('createMessage', {
    from: 'user',
    text: message
  }, () => {})
})
