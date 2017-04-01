'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('.'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("test");
  console.log("testtest!");
});

var port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log('Node Server is Listening port '+ port +'...');
// });
server.listen(port, function () {
  console.log('Node Server is Listening port ' + port + '...');
});