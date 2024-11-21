const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/get-cart-items',authMiddleware,);
router.put('/add-to-cart',authMiddleware,);
router.put('/add-quantity',authMiddleware,)
router.delete('/delete-cart-items',authMiddleware,);
