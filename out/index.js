'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('.'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("connected");
  socket.on('initMarker', function (data) {
    socket.emit('initMarker', data);
  });
  socket.on('updatePosition', function (data) {
    socket.emit('updatePosition', data);
  });

  socket.on('clickMarker', function (data) {
    console.log('clickMarker');
    socket.broadcast.emit('clickMarker', data);
  });
  console.log(socket.handshake.headers.host);
});

var port = process.env.PORT || 3000;
http.listen(port, function () {
  console.log('Node Server is Listening port ' + port + '...');
});