const payment = require('../models/paymentModel');
const RazorPay = require('razorpay');
const dotenv = require('dotenv');
const Order = require('../models/orderModel');
const Crypto = require('crypto');

dotenv.config();

const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.createPayment = async(req,res) =>{
    try{
        const user = req.user.id;
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if(order.status !== "pending"){
            if(order.status ==="cancelled"){
                return res.status(400).json({message:"cannot make payment for cancelled order"});
            }
            if(order.status === "delivered"){
                return res.status(400).json({message:"You have already received your order"});
            }
            return res.status(400).json({message:"You have already made the payment for this order,your order in on the way"});
        }
        const amount = order.finalPrice;
        const amountInPaisa = amount * 100;
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaisa,
            currency: "INR",
            receipt: `recepit_${Date.now()}`,
            notes:{ orderId: order, userId:user},
        });
        const newPayment = new Payment({
            orderId,
            user,
            amount,
            status:"pending",
            transctionId: razorpayOrder.id,
        });
        
        const savedPayment = await newPayment.save();
        res.status(201).json({
            message:"Payment initiated successfully",
            payment: savedPayment, razorpayOrder
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.verifyPayment = async (req,res)=>{
    try{
        const { orderId, transctionId, signature } = req.body;
        const order = await Order.findById(orderId);
        const secret = process.env.RAZORPAY_SECRET_KEY;
        const hmac = crypto.createHmac("sha256",secret);
            hmac.update(orderId + "|" + transctionId);
        const generateSignature = hmac.digest("hex");
        if(generateSignature === signature){
            order.status = "confirmed"
            return res.status(200).json({success: true, message: "Payment verified"});
        }else{
            return res.status(400).json({success:false, message: "Payment not verified"});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};