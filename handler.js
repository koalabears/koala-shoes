var handler = module.exports = {};
var fs = require('fs');
var querystring = require('querystring');
var https = require('https');
var env2 = require('env2')('./config.env');
var jwt = require('jsonwebtoken');
var redis = require('./redis.js');

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
  buildPostData(req, res, getAccessToken);
};



function buildPostData(req, res, callback){
  var code = req.url.split('code=')[1];
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
           setToken(req, res, accessToken);//MOVE THIS TO SET TOKEN
      });
  });
  accessTokenRequest.end(data);


}

function setToken(req,res,accessToken){
  console.log('set token here');
  var cookie = Math.floor(Math.random() * 100000000);
  getUserData(accessToken, function(userName){
    redis.userId(accessToken, userName, function(){
      var jToken = jwt.sign({
        auth: userName,
        agent: req.headers['user-agent'],
        exp: Math.floor(new Date().getTime()/1000)+7*24*3600
      }, process.env.jwtSecret);
      console.log('redirect! ', jToken);
      res.writeHead(302, {
        'Content-Type': 'text/html',
        'Location': '/issues/?token='+jToken + '&userName=' + userName
      });
      res.end(issues);
    });
  });
}

function getUserData(token, callback){
  var optionsUser = {
    hostname: 'api.github.com',
    path: '/user?access_token=' + token,
    method: 'GET'
  };
  var body = '';
  var userReq = https.request(optionsUser, function(res){
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      console.log(body);
      callback(JSON.parse(body).login);
    });
  });
  userReq.setHeader('User-Agent', 'koala-shoes');
  userReq.end();
}
