const mongoose = require("mongoose");

const Review = require('../models/reviewModel')
const MenuItem = require("../models/menuItemModel");
const cloudinaryInstance = require("../config/cloudinary");

//create Menu items
exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, category, isAvailable } = req.body;
    const restaurantId = req.params.restaurantId.trim();

    // Validate restaurantId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }

    // Initialize the image URL with a default value
    let imageUrl = "https://example.com/default-image.jpg"; // Replace with your default image URL

    // Check if an image file is provided
    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = uploadResponse.url; // Use the uploaded image URL
    }

    // Check if the menu item already exists
    const menuItemIsExist = await MenuItem.findOne({
      restaurant: restaurantId,
      name: name,
    });
    if (menuItemIsExist) {
      return res.status(400).json({ message: "Menu item already exists" });
    }

    // Create a new menu item
    const menuItem = new MenuItem({
      name,
      price,
      category,
      restaurant: restaurantId,
      isAvailable,
      image: imageUrl,
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get All Menu Restaurant
exports.getMenuItemsByRestaurant = async (req, res) => {
  try {
      const { restaurantId } = req.params;

      const menuItems = await MenuItem.find({ restaurant: restaurantId }).populate('customerReviews');
      if (menuItems.length === 0) {
          return res.status(404).json({ message: "No menu items found for this restaurant" });
      }

      res.status(200).json(menuItems);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get a menu item by its name 
exports.getMenuItemByName = async (req, res) => {
  try {
      const { name } = req.params;
      const { restaurantId } = req.query; // Optional restaurant filter

      // Build the search query
      const query = { name: new RegExp(name, 'i') }; // Case-insensitive search
      if (restaurantId) {
          query.restaurant = restaurantId;
      }

      // Find menu items matching the name and optional restaurant ID
      const menuItems = await MenuItem.find(query);

      if (menuItems.length === 0) {
          return res.status(404).json({ message: "No menu items found with the given name" });
      }

      res.status(200).json(menuItems);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


//updte Menu items
exports.updateMenuItem = async (req, res) => {
  try {
    
      const { restaurantId, id} = req.params;

      const menuItem = await MenuItem.findOne({ _id: id, restaurant: restaurantId });

      if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found for this restaurant" });
      }

      const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });

      res.status(200).json({ message: "Menu item updated successfully", data: updatedMenuItem });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

//delete Menu Items
exports.deleteMenuItem = async (req, res) => {
  try {
      const { restaurantId, id } = req.params;

      const menuItem = await MenuItem.findOneAndDelete({ _id: id, restaurant: restaurantId });
      if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found for this restaurant" });
      }

      res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};