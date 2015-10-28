var handler = module.exports = {};
var fs = require('fs');

var index = fs.readFileSync(__dirname + '/public/html/index.html');
var issues = fs.readFileSync(__dirname + '/public/html/issues.html');
var mainjs = fs.readFileSync(__dirname + '/public/js/main.js');

var headersHtml = {
  'Content-Type' : 'text/html'
};

var headersJs = {
  'Content-Type' : 'text/javascript'
};

handler.home = function(req, res){
  res.writeHead(200, headersHtml);
  res.end(index);
};

handler.issues = function(req, res){
  res.writeHead(200, headersHtml);
  res.end(issues);
};

handler.mainjs = function(req, res){
  res.writeHead(200, headersJs);
  res.end(mainjs);
};

handler.notFound = function(req, res){
  res.writeHead(404, headersHtml);
  res.end('Resource not found');
};
