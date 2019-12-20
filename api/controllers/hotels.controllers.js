const hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
	console.log('GET the hotels');
	res
		.status(200)
		.json( hotelData );
};

module.exports.hotelsGetOne = function(req, res) {
	const hotelId = req.params.hotelId;
	const thisHotel = hotelData[hotelId];
	console.log('GET hotelId', hotelId);
	res
		.status(200)
		.json( thisHotel );
};