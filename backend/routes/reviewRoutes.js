const express = require('express');
const { addReview, getAllReviews, updateReview, deleteReview, getAverageRating } = require('../controllers/reviewContorller');

const router = express.Router();

router.post('/add-review',addReview);
router.get('/:resturantId/get-all-reviews',getAllReviews);
router.delete('/:reviewId/delete',deleteReview)

module.exports = router;