const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const generateMessage = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var usersConnected = 0;


const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected. Users total: ${++usersConnected}`);
  socket.emit('newMessage', generateMessage('admin', 'Wlcome to the chat page'));
  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

  // socket.emit('newMessage', {
  //   from: 'Bane'
  // , text: 'Do you feel in charge?'
  // , createdAt: new Date
  // });

  socket.on('createMessage', (message, callback) => {
    console.log('(createMessage)', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('(from callback) OK');
  });

  socket.on('disconnect', (socket) => {
    console.log(`User disconnected. Users total: ${--usersConnected}`);
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
