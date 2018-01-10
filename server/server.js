const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//Middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
  socket.on('disconnect', () => {
    console.log('Disconnected from Client');
  });
  socket.on('createMessage', (message, callback) => {
    console.log('created message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('acknowledged by the server');
  });
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
})