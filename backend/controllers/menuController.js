const mongoose = require("mongoose");

const Review = require('../models/reviewModel')
const MenuItem = require("../models/menuItemModel");
const cloudinaryInstance = require("../config/cloudinary");

exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, category, isAvailable } = req.body;
    const restaurantId = req.params.restaurantId.trim();

    // Validate restaurantId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }

     // clodinaryupload
      console.log(req.file,"====req.file")

    const imageUrl = await cloudinaryInstance.uploader.upload(req.file.path);
    console.log(imageUrl,"======imageUrl");

    const menuItemIsExist = await MenuItem.findOne({
      restaurant: restaurantId,
      name: name,
    });
    if (menuItemIsExist) {
      return res.status(400).json({ message: "Menu item is already exist" });
    }

    const menuItem = new MenuItem({
      name,
      price,
      category,
      restaurant: restaurantId,
      isAvailable,
      image:imageUrl.url,
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
