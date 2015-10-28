var redis = require ('redis');
var client;

function startDB(){
  client=redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
}

function stopDB(){
  client.quit();
}

function userId(token, userName, callback){
  client.set('user'+token, userName, function(err,reply){
    callback();
  });
}

module.exports = {
  startDB: startDB,
  stopDB: stopDB,
  userId: userId
};
