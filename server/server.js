const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const isRealString = require('./utils/validation');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const {Users} = require('./utils/users');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
let users = new Users;


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('admin', `Welcome to ${params.room} room`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`));
    console.log(`${params.name} joined ${params.room} room. Users in this room: ${users.getUserList(params.room).length}, total: ${users.userList.length}`);
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      callback();
    }
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
    }

    console.log(`${user.name} disconnected. Users total: ${users.userList.length}`);
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
