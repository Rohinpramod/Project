const express = require('express');
const { createOrder, getAllOrders, getOrderById, getAllRestaurantOrders, updateOrderUser, updateOrderStatus } = require('../controllers/orderController');
const { createPayment, verifyPayment } = require('../controllers/paymentController');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/create-order',roleMiddleware(['user']),createOrder);
router.get('/get-all-order',roleMiddleware(['user']),getAllOrders);
router.get('/get-order-by-id/:orderId',getOrderById);
router.put('/update-Order/:orderId',roleMiddleware(['user']),updateOrderUser);
router.patch('/update-order-status/:orderId',updateOrderStatus);
router.get('/get-all-restaurant-orders/:restaurantId',getAllRestaurantOrders);

router.post('/:orderId/payment',roleMiddleware(['user']),createPayment);
router.post('/verify-payment',roleMiddleware(['user']),verifyPayment);

module.exports = router;