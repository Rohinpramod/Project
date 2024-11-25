const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    order: { type: String, required:true},
    user: { type: String, required:true},
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentMethod: { type: String, enum: ['credit_card', 'debit_card', 'upi', 'cod'], required: true },
    transactionId: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;