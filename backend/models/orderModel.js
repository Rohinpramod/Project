const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    restaurant: { type: String, required: true },
    items: [{
        menuItem: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number },
    status: { type: String, enum: ['pending', 'confirmed', 'preparing', 'out for delivery', 'delivered', 'cancelled'], default: 'pending' },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    coupon: { type: String }, // optional coupon
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;