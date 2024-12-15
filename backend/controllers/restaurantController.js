const mongoose = require("mongoose");

const cloudinaryInstance = require("../config/cloudinary");
const Restaurant = require("../models/restaurantModel");
const MenuItem = require("../models/menuItemModel");

exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, rating, status, contact } = req.body;

    if (!name || !location || !cuisine) {
      return res.status(400).json({ message: "all fields required" });
    }
    //clodinaryupload

    let imageUrl;
    if (req.file) {
      const uploadResponse = await cloudinaryInstance.uploader.upload(
        req.file.path
      );
      imageUrl = uploadResponse.url;
    }

    let restaurant = await Restaurant.findOne({ name });
    if (restaurant)
      return res.status(400).json({ message: "Restaurant already exists" });

    restaurant = new Restaurant({
      name,
      location,
      cuisine,
      owner: req.user.userId,
      image: imageUrl,
    });

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const { search, cuisine } = req.query;
    console.log(cuisine);
    
    const filterObject = {};
    if (search) {
      filterObject.name = { $regex: search, $options: "i" }; 
    }
    if (cuisine && cuisine.toLowerCase() !== "all") {
      filterObject.cuisine = { $regex: `^${cuisine}$`, $options: "i" };
    }
    
    
    const restaurants = await Restaurant.find(filterObject);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    ).populate("menuItems");
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    if (restaurant.owner.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized action" });

    Object.assign(restaurant, req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(
      req.params.restaurantId
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found or unauthorized" });
    }

    await MenuItem.deleteMany({ _id: { $in: restaurant.menuItems } });
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
