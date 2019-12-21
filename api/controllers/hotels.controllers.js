var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function (req, res) {

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
		function (err, results) {
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

module.exports.hotelsGetAll = function (req, res) {

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res);
		return;
	}

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400)
			.json({"message": "Count and offset should be numbers"});
		return;
	}

	if (count > maxCount) {
		res
			.status(400)
			.json({"message": "Count limit of " + maxCount + " exceeded"});
		return;
	}

	Hotel
		.find()
		.limit(count)
		.skip(offset)
		.exec(function (err, hotels) {
			if (err) {
				res
					.status(500)
					.json(err);
			}
			else {
				console.log('Found hotels ', hotels.length);
				res
					.json(hotels);
			}
		});
};

module.exports.hotelsGetOne = function (req, res) {
	const hotelId = req.params.hotelId;
	console.log('GET hotelId', hotelId);

	Hotel
		.findById(hotelId)
		.exec(function (err, doc) {

			var response = {
				status: 200,
				message: doc
			};

			if (err) {
				response.status = 500;
				response.message = err;
			}
			else if (!doc) {
				response.status = 404;
				response.message = {"message": "Hotel ID not found"};
			}

			res
				.status(response.status)
				.json(response.message);

		});
};

module.exports.hotelsAddOne = function (req, res) {
	// database connection - permanent
	const db = dbconn.get();
	const collection = db.collection('hotels');
	var newHotel;


	console.log('Hotels add one');

	if (req.body && req.body.name && req.body.stars) {
		console.log(req.body);

		newHotel = req.body;
		newHotel.stars = parseInt(newHotel.stars, 10);

		collection
			.insertOne(newHotel, function (err, response) {
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
			.json({message: "Required data missing from body"});
	}
};