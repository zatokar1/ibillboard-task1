// DB
var redis = require('redis');
var dbClient = redis.createClient(); 

// Constructor																		
function DbHandler(){}

// DB connection listener
dbClient.on('connect', function() {
    console.log('connected');
});

dbClient.on('error', function (err) {
    console.log('Error connecting to DB: ' + err);
});

// IncrBy in Redis DB by key
DbHandler.prototype.incrByRedis = function(key, value, callback){
	dbClient.incrby(key, value, function(err) {
		return callback(err);
	});
}

// Read from Redis DB
DbHandler.prototype.readFromRedis = function(key, callback){
	dbClient.get(key, function(err, reply) {
		return callback(err, reply)
	});
}

// Set value in Redis DB by key - used only for tests initialization
DbHandler.prototype.writeToRedis = function(key, value, callback){
	dbClient.set(key, value, function(err) {
		return callback(err);
	});
}

// Make functions public, expose them
module.exports = DbHandler;
