var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'CIA'
  , text: 'Ur a big guy'
  });
});

socket.on('disconnect', function () {
  console.log('Disonnected from server');
});

socket.on('newMessage', function (message) {
  console.log(`(${message.createdAt}) ${message.from}: ${message.text}`);
});
