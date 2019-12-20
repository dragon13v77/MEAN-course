const express = require('express');
const router = express.Router();

const ctrlHotels = require('../controllers/hotels.controllers');

router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll);

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne);

module.exports = router;