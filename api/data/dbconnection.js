var MongoClient = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017';

var _connection = null;

var open = function() {
	// set connection
	MongoClient.connect(dburl, function(err, client) {
		if (err) {
			console.log('An error occured while connectiong to MongoDB');
			return;
		}
		_connection = client.db('meanhotel');
		console.log('DB connection open', _connection);
	})
};

var get = function() {
	return _connection;
};

module.exports = {
	open: open,
	get: get
};