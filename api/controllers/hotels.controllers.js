const dbconn = require('../data/dbconnection');
const hotelData = require('../data/hotel-data.json');
const ObjectId = require('mongodb').ObjectId;

module.exports.hotelsGetAll = function(req, res) {
	// database connection - permanent
	const db = dbconn.get();
	const collection = db.collection('hotels');

	var offset = req.query && req.query.offset && parseInt(req.query.offset, 10) || 0;
	var count = req.query && req.query.count && parseInt(req.query.count, 10) || 5;

	collection
		.find()
		.limit(count)
		.skip(offset)
		.toArray(function(err, docs) {
			console.log('Found hotels', docs);
			res
				.status(200)
				.json( docs );
		});
};

module.exports.hotelsGetOne = function(req, res) {
	// database connection - permanent
	const db = dbconn.get();
	const collection = db.collection('hotels');

	const hotelId = req.params.hotelId;
	console.log('GET hotelId', hotelId);
	collection
		.findOne({
			_id : ObjectId(hotelId)
		}, function(err, doc) {
			res
				.status(200)
				.json( doc );
		});
};

module.exports.hotelsAddOne = function(req, res) {
	console.log('Hotels add one');
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};