var handler = module.exports = {};
var auth = require('./auth.js');
var fs = require('fs');


var index = fs.readFileSync(__dirname + '/public/html/index.html');
var issues = fs.readFileSync(__dirname + '/public/html/issues.html');


var headersHtml = {
  'Content-Type' : 'text/html'
};

handler.home = function(req, res){
  res.writeHead(200, headersHtml);
  res.end(index);
};

handler.issues = function(req, res){
  res.writeHead(200, headersHtml);
  res.end(issues);
};

handler.notFound = function(req, res){
  res.writeHead(404, headersHtml);
  res.end('Resource not found');
};

handler.auth = function(req, res){
  res.writeHead(200, headersHtml);
  auth.buildPostData(req, res, auth.getAccessToken);
};
