const express = require('express');
const { createOrder, getAllOrders, getOrderById, getAllRestaurantOrders, updateOrderUser, updateOrderStatus } = require('../controllers/orderController');


const router = express.Router();

router.post('/create-order',createOrder);
router.get('/get-all-order',getAllOrders);
router.get('/get-order-by-id/:orderId',getOrderById);
router.put('/update-Order/:orderId',updateOrderUser);
router.patch('/update-order-status/:orderId',updateOrderStatus);
router.get('/get-all-restaurant-orders/:restaurantId',getAllRestaurantOrders);

module.exports = router;