const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');


const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Bane'
  , text: 'Do you feel in charge?'
  , createdAt: new Date
  });

  socket.on('createMessage', (message) => {
    message.createdAt = new Date;
    console.log(message);
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
