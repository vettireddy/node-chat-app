const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//Middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('disconnect', () => {
    console.log('Disconnected from Client');
  })
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
})