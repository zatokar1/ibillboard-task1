var chai = require('chai');
//var expect = chai.expect; // we are using the "expect" style of Chai
var assert = chai.assert;
var Main = require('../main');

// Init main module
var main = new Main();

// Truncate log file contents
describe('main', function() {
  it('writeToFile(fileName, value, callback) should write value to log file', function(done) {
    main.writeToFile(main.logFileName, '', function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Write to DB - Initialize value to 0
describe('main', function() {
  it('writeToRedis(key, value, callback) should write value to DB', function(done) {
    main.writeToRedis('count', 0, function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Write to log file
describe('main', function() {
  it('appendToFile(fileName, value, callback) should write value to log file', function(done) {
    main.appendToFile(main.logFileName, 0, function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Read from DB - expected value 0
describe('main', function() {
  it('readFromRedis(key, callback) should read value from DB', function(done) {
   main.readFromRedis('count',function(err, value){
			assert.ifError(err);
			assert.equal(value, 0);
            done();
		});
  });
});

// Incr by 1 in DB
describe('main', function() {
  it('incrByRedis(key, value, callback) should write value to DB', function(done) {
    main.incrByRedis('count', 1, function(err){
		assert.ifError(err);
		done();
	});
  });
});

// Read from DB - expected value 1
describe('main', function() {
  it('readFromRedis(key, callback) should read value from DB', function(done) {
   main.readFromRedis('count',function(err, value){
			assert.ifError(err);
			assert.equal(value, 1);
            done();
		});
  });
});

// Test get request - expect value 1

// Test POST request - expect POST done



