var fs = require('fs');

// Constructor																		
function FileHandler(){}

// Write to file
FileHandler.prototype.appendToFile = function(fileName, content, callback){
	fs.appendFile(fileName, content, encoding='utf8', function (err) {
		return callback(err);
	});
}

// Write to file - used only for tests initialization (truncating file contents)
FileHandler.prototype.writeToFile = function(fileName, content, callback){
	fs.writeFile(fileName, content, function(err){
		callback(err);
	});
}

// Make functions public, expose them
module.exports = FileHandler;