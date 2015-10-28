var handler = require('./handler.js');
var fs = require('fs');

var routes = {
  '' : handler.home,
  'issues' : handler.issues,
  '404' : handler.notFound
};

module.exports = function(req, res){
  var tokenisedUrl = tokeniseUrl(req);
  //console.log(req.url);
  //console.log("*"+tokenisedUrl[1]+"*");
  //console.log(handler.home);
  if(routes[tokenisedUrl[1]]){
    routes[tokenisedUrl[1]](req, res, tokenisedUrl);
  } else {
    routes[404](req, res);
  }
};

function tokeniseUrl(request) {
  return request.url.split('/'); //getting all requests in array format so we can target the endpoints
}
