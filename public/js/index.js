var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'CIA'
  // , text: 'Ur a big guy'
  // });

});

socket.on('disconnect', function () {
  console.log('Disonnected from server');
});

socket.on('newMessage', function (message) {

  let li = $('<li></li>');
  li.text(`(${message.createdAt}) ${message.from}: ${message.text}`);
  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User'
  , text: $('[name=message]').val()
}, function () {
  $('[name=message]').val('');
});

});
