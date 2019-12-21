var mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017';
const dbname = 'meanhotel';

mongoose.connect(dburl, {
	dbName: dbname
});

mongoose.connection.on('connected', function() {
	console.log('Mnogoose connected to ' + dburl);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mnogoose disconnected');
});

mongoose.connection.on('error', function(err) {
	console.log('Mnogoose connection error' + err);
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

process.on('SIGTERM', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

process.once('SIGUSR2', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Bring in schema and models
require('./hotels.models');