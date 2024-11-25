const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getCart, addToCart, addQuantity, deleteCartItem } = require('../controllers/cartControllers');

const router = express.Router();

router.get('/get-cart-items',authMiddleware,getCart);
router.post('/add-to-cart',authMiddleware,addToCart);
router.put('/add-quantity',authMiddleware,addQuantity)
router.delete('/delete-cart-items',authMiddleware,deleteCartItem);

module.exports = router;