var http = require('http');
var router = require('./router.js');
var port = process.env.PORT || 5000;
var redis = require('./redis.js');
// var socket = require('./socket.js');

var app = function(req, res){
  router(req, res);
};

redis.startDB();
var server = http.createServer(app).listen(port);
console.log('server now listening on port: ', port);

// socket(server);
