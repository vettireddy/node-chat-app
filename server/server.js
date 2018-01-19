const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validations.js');
const {Users} = require('./utils/users');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//Middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} Joined.`));

    callback();
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
    }
    console.log('Disconnected from Client');
  });
  socket.on('createMessage', (message, callback) => {
    // console.log('created message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
})