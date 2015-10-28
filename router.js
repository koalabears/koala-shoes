var handler = require('./handler.js');
var fs = require('fs');

var routes = {
  "/" : handler.home,
  "/issues" : handler.issues,
  '404' : handler.notFound
};

module.exports = function(req, res){
  console.log(req.url);
  if(routes[req.url]){
    routes[req.url](req, res);
  } else {
    routes[404](req, res);
  }
};
