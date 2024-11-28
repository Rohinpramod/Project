const Cart  = require('../models/cartModel');
const MenuItem = require('../models/menuItemModel')

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
    const { foodId, restaurantId, quantity } = req.body;

    const menuItem = await MenuItem.findById(foodId).populate("restaurant");
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    
    const itemPrice = menuItem.price * quantity;
    let cart = await Cart.findOne({ userId });
    if (cart && cart.restaurantId !== restaurantId) {
      return res
        .status(409)
        .json({
          message: "Item from different restaurant is already added to cart",
        });
    }
    if (!cart) {
      cart = new Cart({
        userId,
        restaurantId,
        items: [],
        totalPrice: 0,
        finalPrice: 0,
      });
    }
    const existingItemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalItemPrice += itemPrice;
    } else {
      cart.items.push({
        foodId,
        restaurantId,
        quantity,
        totalItemPrice: itemPrice,
      });
    }
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );
    cart.finalPrice = cart.totalPrice;
    await cart.save();
    const populatedCart = await Cart.findById(cart._id)
      .populate("items.foodId", "name price")
      .populate("userId", "name")
      .populate("restaurantId", "name location");
    res
      .status(200)
      .json({ message: "Item added to cart", cart: populatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:error.message });
  }
};

//addQunatity
exports.addQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { foodId, action } = req.body;
    if (!["increment", "decrement"].includes(action)) {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'increment' or 'decrement'." });
    }
    const cart = await Cart.findOne({ userId })
      .populate("items.foodId", "name price")
      .populate("userId", "name")
      .populate("restaurantId", "name location");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.foodId._id.toString() === foodId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    const item = cart.items[itemIndex];
    if (action === "increment") {
      item.quantity += 1;
      item.totalItemPrice += item.foodId.price;
      cart.totalPrice += item.foodId.price;
    } else if (action === "decrement") {
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalItemPrice -= item.foodId.price;
        cart.totalPrice -= item.foodId.price;
      } else {
        cart.totalPrice -= item.totalItemPrice;
        cart.items.splice(itemIndex, 1);
      }
    }
    cart.finalPrice = cart.totalPrice;
    await cart.save();
    return res.status(200).json({ message: "Item quantity updated", cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  
  

