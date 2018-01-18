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
  let formattedTime = moment(message.createdAt).format('HH:mm');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    from: message.from
  , text: message.text
  , formattedTime
  });
  $('#messages').append(html);

});


socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('HH:mm');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from
  , url: message.url
  , formattedTime
  });
  $('#messages').append(html);
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();

  let messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User'
  , text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude
    , longitude: position.coords.longitude
    });
  }, function (e) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
