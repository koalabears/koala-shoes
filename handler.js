var handler = module.exports = {};
var fs = require('fs');
var querystring = require('querystring');
var https = require('https');
var env2 = require('env2')('./config.env');

var index = fs.readFileSync(__dirname + '/public/html/index.html');
var issues = fs.readFileSync(__dirname + '/public/html/issues.html');

var headersHtml = {
  'Content-Type' : 'text/html'
};

handler.home = function(req, res){
  res.writeHead(200, headersHtml);
  res.end(index);
};

handler.notFound = function(req, res){
  res.writeHead(404, headersHtml);
  res.end('Resource not found');
};

handler.issues = function(req, res){
  res.writeHead(200, headersHtml);
  buildPostData(req, res, getAccessToken);
};



function buildPostData(req, res, callback){
  //console.log("hello");
  var code = req.url.split('code=')[1];
  //console.log("code", code);
  var postData = querystring.stringify({
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    code: code
  });
  callback(req, res, postData);
}

function getAccessToken(req, res, data){
  var accessTokenRequest = https.request({
    hostname: 'github.com',
    path: '/login/oauth/access_token',
    method: 'POST'
  }, function(responseFromGithub){
      responseFromGithub.on('data', function(chunk){
        var accessToken = chunk.toString().split('access_token=')[1].split('&')[0];
        res.end(issues);
      });
  });
  accessTokenRequest.end(data);
}
