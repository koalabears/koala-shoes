var handler = module.exports = {};
var auth = require('./auth.js');
var fs = require('fs');


var index = fs.readFileSync(__dirname + '/public/html/index.html');
var issues = fs.readFileSync(__dirname + '/public/html/issues.html');
var mainjs = fs.readFileSync(__dirname + '/public/js/main.js');
var stylecss = fs.readFileSync(__dirname + '/public/css/custom.css');


var headersHtml = {
  'Content-Type' : 'text/html'
};

var headersJs = {
  'Content-Type' : 'text/javascript'
};

var headersCss = {
  'Content-Type' : 'text/css'
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

handler.stylecss = function(req, res){
  res.writeHead(200, headersCss);
  res.end(stylecss);
};

handler.notFound = function(req, res){
  res.writeHead(404, headersHtml);
  res.end('Resource not found');
};

handler.auth = function(req, res){
  res.writeHead(200, headersHtml);
  auth.buildPostData(req, res, auth.getAccessToken);
};
