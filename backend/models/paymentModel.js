const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    orderId: { type: String, required:true},
    user: { type: String, required:true},
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    transactionId: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports =  Payment;