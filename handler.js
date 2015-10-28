var handler = module.exports = {};
var fs = require('fs');

var index = fs.readFileSync(__dirname + '/public/html/index.html');

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
