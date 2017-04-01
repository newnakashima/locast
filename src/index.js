var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io').listen(http);

app.use(express.static('.'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("test");
  console.log("testtest!");
});

var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('Node Server is Listening port '+ port +'...');
});
