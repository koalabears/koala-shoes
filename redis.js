var redis = require ('redis');
var client;

function startDB(){
  client=redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
}

function stopDB(){
  client.quit();
}

function userId(userName, token, callback){
  client.set('user'+ userName, token, function(err,reply){
    callback();
  });
}

function getAccessToken(username, callback){
  client.get('user'+ username, function(err, reply){
      callback(reply);
  });
}

module.exports = {
  startDB: startDB,
  stopDB: stopDB,
  userId: userId,
  getAccessToken: getAccessToken
};
