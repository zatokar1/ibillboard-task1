var chai = require('chai');
//var expect = chai.expect; // we are using the "expect" style of Chai
var assert = chai.assert;

var config = require('../config');

// DB
var DbHandler = require('../dbHandler.js');
var dbHandler = new DbHandler();

// File
var FileHandler = require('../fileHandler.js');
var fileHandler = new FileHandler();

// Truncate log file contents
describe('fileHandler', function() {
  it('writeToFile(fileName, value, callback) should write value to log file', function(done) {
    fileHandler.writeToFile(config.logFileName, '', function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Write to DB - Initialize value to 0
describe('dbHandler', function() {
  it('writeToRedis(key, value, callback) should write value to DB', function(done) {
    dbHandler.writeToRedis('count', 0, function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Write to log file
describe('fileHandler', function() {
  it('appendToFile(fileName, value, callback) should write value to log file', function(done) {
    fileHandler.appendToFile(config.logFileName, 0, function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Read from DB - expected value 0
describe('dbHandler', function() {
  it('readFromRedis(key, callback) should read value from DB', function(done) {
   dbHandler.readFromRedis('count',function(err, value){
			assert.ifError(err);
			assert.equal(value, 0);
            done();
		});
  });
});

// Incr by 1 in DB
describe('dbHandler', function() {
  it('incrByRedis(key, value, callback) should write value to DB', function(done) {
    dbHandler.incrByRedis('count', 1, function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Read from DB - expected value 1
describe('dbHandler', function() {
  it('readFromRedis(key, callback) should read value from DB', function(done) {
   dbHandler.readFromRedis('count',function(err, value){
			assert.ifError(err);
			assert.equal(value, 1);
            done();
		});
  });
});

// Test get request - expect value 1

// Test POST request - expect POST done



