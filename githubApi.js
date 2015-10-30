var auth = require('./auth.js');
var jwt = require('jsonwebtoken');
var redis = require('./redis.js');
var https = require('https');
var fs = require('fs');

var issues = fs.readFileSync(__dirname + '/public/html/issues.html');

var api = module.exports = {};

api.getIssues = function(jToken, callback) {
  var decodedJWT = jwt.decode(jToken);
  var username = decodedJWT.auth;
  redis.getAccessToken(username, function(githubAccessToken) {
    var options = {
      host: 'api.github.com',
      path: '/issues?filter=assigned&state=open',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
        'Authorization': 'token '+githubAccessToken
      }
    };
    var issuesReq = https.request(options, function(res) {
      parseBody(res, function(body) {
        callback(body);
      });
    });
    issuesReq.setHeader('User-Agent', 'koala-shoes');
    issuesReq.end();
  });

};


function parseBody(object, callback) {
  var body = "";
  object.on('data', function(data) {
    body += data;
  });
  object.on('end', function() {
    callback(body);
  });
  object.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
