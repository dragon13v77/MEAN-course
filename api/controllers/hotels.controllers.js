var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {

	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	// a geoJson point that Mongoose understand and will use to query
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};

	Hotel
		.aggregate(
		[
			{
				'$geoNear': {
					near: point,
					maxDistance: 2000,
					distanceField: 'dist.calculated',
					spherical: true
				}
			}
		],
		function(err, results) {
			if (err) {
				console.log("Error", err);
			}
			console.log('Geo results', results);
			res
				.status(200)
				.json(results);
		}
	);


	// Old version of Mongoose
	//var geoOptions = {
	//	spherical: true,
	//	maxDistance: 2000,
	//	num: 5
	//};
	//Hotel
	//	.geoNear(point, geoOptions, function(err, results, stats) {
	//		console.log('Geo results', results);
	//		console.log('Geo stats', stats);
	//		res
	//			.status(200)
	//			.json(results);
	//	});
};

module.exports.hotelsGetAll = function(req, res) {

	var offset = req.query && req.query.offset && parseInt(req.query.offset, 10) || 0;
	var count = req.query && req.query.count && parseInt(req.query.count, 10) || 5;

	if ( req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res);
		return;
	}

	Hotel
		.find()
		.limit(count)
		.skip(offset)
		.exec(function(err, hotels) {
			console.log('Found hotels', hotels);
			res
				.json(hotels);
		});
};

module.exports.hotelsGetOne = function(req, res) {
	const hotelId = req.params.hotelId;
	console.log('GET hotelId', hotelId);

	Hotel
		.findById(hotelId)
		.exec(function(err, doc) {
			res
				.status(200)
				.json( doc );
		});
};

module.exports.hotelsAddOne = function(req, res) {
	// database connection - permanent
	const db = dbconn.get();
	const collection = db.collection('hotels');
	var newHotel;


	console.log('Hotels add one');

	if (req.body && req.body.name && req.body.stars) {
		console.log(req.body);

		newHotel  = req.body;
		newHotel.stars = parseInt(newHotel.stars, 10);

		collection
			.insertOne(newHotel, function(err, response) {
				console.log(response);
				res
					.status(201)
					.json(response.ops);
			})
	}
	else {
		console.log("Data missing from the body");
		res
			.status(400)
			.json({message : "Required data missing from body"});
	}
};