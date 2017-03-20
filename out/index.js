'use strict';

var express = require('express');
var app = express();

app.use(express.static('.'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Node Server is Listening port ' + port + '...');
});