const Cart  = require('../models/cartModel');
const MenuItems = require('../models/menuItemModel')

//get-cart
exports.getCart = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const cart = await  Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart is empty" });
      }
  
      res.status(200).json({message:"cart items fetched",data:cart});
    } catch (error) {
      res.status(500).json({ message:error.message});
    }
  };

//add-to-cart
exports.addToCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { foodId, name, quantity, price } = req.body;
  
      const menuItem = await MenuItems.findById(foodId);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [], totalPrice: 0, finalPrice: 0 });
      }
  
      const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
  
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].totalItemPrice =
          cart.items[itemIndex].quantity * cart.items[itemIndex].price;
      } else {
        cart.items.push({
          foodId,
          name,
          quantity,
          price,
          totalItemPrice: quantity * price,
        });
      }
  
      // Recalculate 
      cart.totalPrice = cart.items.reduce((total, item) => total + item.totalItemPrice, 0);
      cart.finalPrice = cart.discount
        ? cart.totalPrice - cart.totalPrice * (cart.discount / 100)
        : cart.totalPrice;
  
      await cart.save();
  
      res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

//addQunatity
exports.addQuantity = async (req, res) => {
    try {
      const userId = req.user.id;
      const { foodId } = req.body;
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      cart.items[itemIndex].quantity += 1;
      cart.items[itemIndex].totalItemPrice =
        cart.items[itemIndex].quantity * cart.items[itemIndex].price;
  
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => total + item.totalItemPrice, 0);
      cart.finalPrice = cart.discount
        ? cart.totalPrice - cart.totalPrice * (cart.discount / 100)
        : cart.totalPrice;
  
      await cart.save();
  
      res.status(200).json({ message: "Quantity updated", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Delete an item from the cart
exports.deleteCartItem = async (req, res) => {
    try {
      const userId = req.user.id;
      const { foodId } = req.body;
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
  
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => total + item.totalItemPrice, 0);
      cart.finalPrice = cart.discount
        ? cart.totalPrice - cart.totalPrice * (cart.discount / 100)
        : cart.totalPrice;
  
      await cart.save();
  
      res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  

