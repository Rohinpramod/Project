const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getCart, addToCart, addQuantity, deleteCartItem } = require('../controllers/cartControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/get-cart-items',authMiddleware,getCart);
router.post('/add-to-cart',authMiddleware,addToCart);
router.post('/add-quantity',authMiddleware,addQuantity);
router.delete('/delete-cart-items',authMiddleware,deleteCartItem);

module.exports = router;