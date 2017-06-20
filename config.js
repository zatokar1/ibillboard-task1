var config = {};

config.logFileName = 'log.txt';

// When reading from Redis
config.key = 'count';

// Error messages
config.errorReadFromRedisMessage = 'Error during reading from DB';
config.errorWriteToRedisMessage = 'Error during writing to DB';
config.errorWriteToFileMessage = 'Error during writing to file';

module.exports = config;