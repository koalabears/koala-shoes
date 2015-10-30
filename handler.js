var handler = module.exports = {};
var auth = require('./auth.js');
var fs = require('fs');
var api = require('./githubApi.js');


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

handler.issues = function(req, res, tokenisedUrl){
  res.writeHead(200, headersHtml);
  api.getIssues(tokenisedUrl[2].split('=')[1], function(issueData){
    console.log(issueData);
  });
};

handler.mainjs = function(req, res){
  res.writeHead(200, headersJs);
  res.end(mainjs);
};

handler.notFound = function(req, res){
  res.writeHead(404, headersHtml);
  res.end('Resource not found');
};

handler.auth = function(req, res){
  res.writeHead(200, headersHtml);
  auth.buildPostData(req, res, auth.getAccessToken);

};
