const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getCart, addToCart, removeItemFromCart, updateItemQuantity, deleteCart } = require('../controllers/cartControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/get-cart-items',authMiddleware,getCart);
router.post('/add-to-cart',authMiddleware,addToCart);
router.post('/add-quantity',authMiddleware,removeItemFromCart);
router.put('/updateCart',updateItemQuantity);
router.delete('/delete-cart-items',authMiddleware,deleteCart);

module.exports = router;