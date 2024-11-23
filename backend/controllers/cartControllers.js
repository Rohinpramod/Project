const cart  = require('../models/cartModel');

//getCart
exports.getCart = async (req,res)=>{
    try{
        const userId = res.user._id;

        const cart = await cart.findOne({userId}).populate('items.itemId');
        if(!cart){
            return res.status(404).json({message:"cart not found"});
        }
        res.status(200).json({message:"cart items fetched",data:cart});
    }catch(error){
        res.status(500).json({message:"internal server error",error});
    }
};

//addCart
exports.addCourseCart = async (req,res)=>{
    try{    
        const userId = req.user._id;
        const { foodId } = req.body;

        const items = await items.findById(foodId);
        if(!items){
            return res.status(404).json({message:"items not found"});
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new cart({userId, items:[]});
        }

    }catch(error){

    }
}
