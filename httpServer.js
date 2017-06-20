// Declaration of vars
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Global config
var config = require('./config.js')

// DB
var DbHandler = require('./dbHandler.js');
var dbHandler = new DbHandler();

// File
var FileHandler = require('./fileHandler.js');
var fileHandler = new FileHandler();

// Add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');
// Parse application/json 
app.use(bodyParser.json());


// HTTP GET
app.get('/count', function (req, res) {
	dbHandler.readFromRedis(config.key, function(err, value){
		if (err){
			console.log(config.errorReadFromRedisMessage + ' Err obj: ' + JSON.stringify(err));
			return res.sendStatus(500);
		} else {
			console.log('Reading from DB successful. Value of key: ' + config.key + ' = ' + value);
			return res.send(value);
		}
	});
});

// HTTP POST
app.post('/track', jsonParser, function (req,res){
	// If no POST body, return 400
	if (!req.body) return res.sendStatus(400);
	// Write to file
	fileHandler.appendToFile(config.logFileName, JSON.stringify(req.body), function(err){
		if (err){
			// Writing to file not successful
			console.log(config.errorWriteToFileMessage  + ' Err obj: ' +  JSON.stringify(err));
			return res.sendStatus(500);
		} else{
			// Writing to file was successful
			console.log('Writing to file was successful');
		}
	});
	
	// Write to DB
	if (req.body.count) {
		dbHandler.incrByRedis('count', req.body.count, function(err){
			if (err){
				// Writing to DB not successful 
				var message = 'Error during writing to DB';
				console.log(config.errorWriteToRedisMessage + ' Err obj: ' + JSON.stringify(err));
				return res.sendStatus(500);
			} else {
				// Writing to DB was successful
				console.log('Writing to DB was succesful');
				res.send('POST Done');
			}
		});
	}	
});


// Web app running on port 3000
app.listen(3000, function() {
  console.log('App listening on port 3000!')
});

