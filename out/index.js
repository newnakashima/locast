'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/locast';

var insertFeelings = function insertFeelings(db, inserts, callback) {
  var collection = db.collection('feelings');
  collection.insertMany(inserts, function (err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

var findFeelings = function findFeelings(db, query, callback) {
  var collection = db.collection('feelings');
  collection.find(query).toArray(function (err, docs) {
    console.log(docs);
    callback(docs);
  });
};

var updateFeelings = function updateFeelings(db, find, update, callback) {
  var collection = db.collection('feelings');
  collection.updateOne(find, update, function (err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

var removeFeelings = function removeFeelings(db, find, callback) {
  var collection = db.collection('feelings');
  collection.deleteOne(find, function (err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

var indexCollection = function indexCollection(db, index, callback) {
  db.collection('feelings').createIndex(index, null, function (err, results) {
    console.log(results);
    callback();
  });
};

app.use(express.static('.'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("connected");
  socket.on('initMarker', function (data) {
    MongoClient.connect(url, function (err, db) {
      findFeelings(db, {}, function (res) {
        console.log("findFeelings. data=" + res);
        res.forEach(function (data) {
          return io.emit('cast feeling', data);
        });
      });
    });
    io.emit('initMarker', data);
  });
  socket.on('updatePosition', function (data) {
    io.emit('updatePosition', data);
  });

  socket.on('clickMarker', function (data) {
    console.log('clickMarker');
    io.emit('clickMarker', data);
  });

  socket.on('cast feeling', function (data) {
    console.log(data);
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      insertFeelings(db, [{
        ID: data.ID,
        feeling: data.feeling,
        location: data.location,
        timestamp: data.timestamp
      }], function (res) {
        return console.log(res);
      });
    });
    io.emit('cast feeling', data);
  });
  console.log(socket.handshake.headers.host);
});

var port = process.env.PORT || 3000;
http.listen(port, function () {
  console.log('Node Server is Listening port ' + port + '...');
});