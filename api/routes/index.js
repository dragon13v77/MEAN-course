const express = require('express');
const router = express.Router();

const ctrlHotels = require('../controllers/hotels.controllers');

router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll);

module.exports = router;