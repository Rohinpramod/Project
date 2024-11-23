const mongoose = require('mongoose');

const  cloudinaryInstance  = require("../config/cloudinary");
const Restaurant = require("../models/restaurantModel");


exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine } = req.body;

    if (!name || !location || !cuisine) {
      return res.status(400).json({ message: "all fields required" });
  }
    //clodinaryupload
   
    console.log(req.file,"====req.file")

    const imageUrl = await cloudinaryInstance.uploader.upload(req.file.path);
    console.log(imageUrl,"======imageUrl");
  
    let restaurant = await Restaurant.findOne({name})
    if (restaurant) return res.status(400).json({ message: "Restaurant already exists" });
      
    restaurant = new Restaurant({
      name,
      location,
      cuisine,
      owner: req.user.userId,
      image:imageUrl.url
    });

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId).populate("menuItems");
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
      
      const restaurant = await Restaurant.findOne({
        _id: req.params.restaurantId,
        owner: req.user.userId, 
      });
  
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found or unauthorized" });
      }
  
      await Restaurant.findByIdAndDelete(req.params.restaurantId);
      res.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  