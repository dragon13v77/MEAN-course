const express = require('express');
const router = express.Router();

const ctrlHotels = require('../controllers/hotels.controllers');
const ctrlReviews = require('../controllers/reviews.controllers');

// hotels routes
router
	.route('/hotels')
	.get(ctrlHotels.hotelsGetAll);

router
	.route('/hotels/:hotelId')
	.get(ctrlHotels.hotelsGetOne);

router
	.route('/hotels/new')
	.post(ctrlHotels.hotelsAddOne);

// review routes
router
	.route('/hotels/:hotelId/reviews')
	.get(ctrlReviews.reviewsGetAll);

router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(ctrlReviews.reviewsGetOne);

module.exports = router;