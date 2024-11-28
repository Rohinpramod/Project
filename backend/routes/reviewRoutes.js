const express = require('express');
const { addReview, getAllReviews } = require('../controllers/reviewContorller');

const router = express.Router();

router.post('/add-review',addReview);
router.get('/:resturantId/get-all-reviews',getAllReviews);
router.get('/get-avg-rating/:foodId',);
router.delete('/delete-review/:reviewId',)

module.exports = router;