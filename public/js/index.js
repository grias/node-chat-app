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


socket.on('newLocationMessage', function (message) {
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location.</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude
    , longitude: position.coords.longitude
    });
  }, function (e) {
    alert('Unable to fetch location');
  });
});
