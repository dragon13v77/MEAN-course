const hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
	console.log('GET the hotels');
	console.log(req.query);

	var offset = req.query && req.query.offset && parseInt(req.query.offset, 10) || 0;
	var count = req.query && req.query.count && parseInt(req.query.count, 10) || 5;

	var returnData = hotelData.slice(offset, offset + count);

	res
		.status(200)
		.json( returnData );
};

module.exports.hotelsGetOne = function(req, res) {
	const hotelId = req.params.hotelId;
	const thisHotel = hotelData[hotelId];
	console.log('GET hotelId', hotelId);
	res
		.status(200)
		.json( thisHotel );
};

module.exports.hotelsAddOne = function(req, res) {
	console.log('Hotels add one');
	console.log(req.body);
	res
		.status(200)
		.json(req.body);
};