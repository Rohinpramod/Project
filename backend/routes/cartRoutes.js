const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getCart } = require('../controllers/cartControllers');

const router = express.Router();

router.get('/get-cart-items',authMiddleware,getCart);
router.put('/add-to-cart',authMiddleware,);
router.put('/add-quantity',authMiddleware,)
router.delete('/delete-cart-items',authMiddleware,);
