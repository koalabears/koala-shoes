var handler = require('./handler.js');
var fs = require('fs');

var routes = {
  '' : handler.home,
  'auth' : handler.auth,
  'issues' : handler.issues,
  "main.js" : handler.mainjs,
  'style.css': handler.stylecss,
  '404' : handler.notFound
};

module.exports = function(req, res){
  var tokenisedUrl = tokeniseUrl(req);
  console.log(tokenisedUrl);
  if(routes[tokenisedUrl[1]]){
    routes[tokenisedUrl[1]](req, res, tokenisedUrl);
  } else {
    routes[404](req, res);
  }

};
function tokeniseUrl(request) {
  console.log("!!!!!", request.url.split('/'));
  return request.url.split('/'); //getting all requests in array format so we can target the endpoints
}
