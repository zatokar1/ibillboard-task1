const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var redis = require('redis');

Main.prototype.logFileName = 'log.txt';

// Add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');

// New DB client
var dbClient = redis.createClient(); 

const app = express();
var jsonParser = bodyParser.json();

// Parse application/json 
app.use(bodyParser.json());

// DB connection listener
dbClient.on('connect', function() {
    console.log('connected');
});

// Constructor
function Main(){}
var main = new Main();

// HTTP GET
app.get('/count', function (req, res) {
	var key = 'count';
	main.readFromRedis(key, function(err, value){
		if (err){
			var message = 'Error during reading from DB';
			console.log(message + ' Err obj: ' + JSON.stringify(err));
			return res.send(message);
		} else {
			console.log('Reading from DB successful. Value of key: ' + key + ' = ' + value);
			return res.send(value);
		}
	});
});

// HTTP POST
app.post('/track', jsonParser, function (req,res){
	// If no POST body, return 400
	if (!req.body) return res.sendStatus(400);
	
	// Write to DB
	if (req.body.count) {
		main.incrByRedis('count', req.body.count, function(err){
			if (err){
				// Writing to DB not successful 
				var message = 'Error during writing to DB';
				console.log(message + ' Err obj: ' + JSON.stringify(err));
				return res.send(message);
			} else {
				// Writing to DB was successful
				console.log('Writing to DB was succesful');
			}
		});
	}
	
	// Write to file
	main.appendToFile(logFileName, JSON.stringify(req.body), function(err){
		if (err){
			// Writing to file not successful
			var message = 'Error during writing to file';
			console.log(message  + ' Err obj: ' +  JSON.stringify(err));
			return res.send(message);
		} else{
			// Writing to file was successful
			console.log('Writing to file was successful');
		}
	});
	res.send('POST Done')
});

// IncrBy in Redis DB by key
Main.prototype.incrByRedis = function(key, value, callback){
	dbClient.incrby(key, value, function(err) {
		return callback(err);
	});
}

// Read from Redis DB
Main.prototype.readFromRedis = function(key, callback){
	dbClient.get(key, function(err, reply) {
		return callback(err, reply)
	});
}

// Write to file
Main.prototype.appendToFile = function(fileName, content, callback){
	fs.appendFile(fileName, content, encoding='utf8', function (err) {
		return callback(err);
	});
}

// Set value in Redis DB by key - used only for tests initialization
Main.prototype.writeToRedis = function(key, value, callback){
	dbClient.set(key, value, function(err) {
		return callback(err);
	});
}

// Write to file - used only for tests initialization (truncating file contents)
Main.prototype.writeToFile = function(fileName, content, callback){
	fs.writeFile(fileName, content, function(err){
		callback(err);
	});
}

// Web app running on port 3000
app.listen(3000, function() {
  console.log('App listening on port 3000!')
});

// Make functions public, expose them
module.exports = Main;
