const mongoose = require('mongoose');

// const order = require('../model/orderModel');

const MenuItems = require('../models/menuItemModel');
const Review = require('../models/reviewModel');

// Create a new review
exports.addReview = async (req, res) => {
    try {
      const { menuItems, rating, comment } = req.body;
      const userId = req.user.id;

      // const order = await order.find(userId);

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const foundMenuItem = await MenuItems.findById(menuItems);
      if (!foundMenuItem) {
        return res.status(404).json({ message: "MenuItem not found" });
      }
  
      const newReview = new Review({
        user: userId,
        menuItems,
        rating,
        comment,
      });
  
      const savedReview = await newReview.save();

      foundMenuItem.customerReviews.push(savedReview._id);
      await foundMenuItem.save();
      await savedReview.populate("menuItems","name price");

      res.status(201).json({message:"Review submitted successfully",savedReview});
    } catch (error) {
      res.status(500).json({ message:error.message });
    }
  };
  
  // Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate("user", "email") 
        .populate("menuItems", "name");
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get reviews by user ID
  // const getUserReviews = async (req, res) => {
  //   try {
  //     const userId = req.userId || req.query.userId; // Assuming `userId` is passed from middleware or query
  
  //     if (!userId) {
  //       return res.status(400).json({ message: "User ID is required" });
  //     }
  
  //     const userReviews = await Review.find({ user: userId }).populate(
  //       "restaurant",
  //       "name location"
  //     );
  
  //     res.status(200).json(userReviews);
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to fetch user reviews", error });
  //   }
  // };
  
  // Delete a review
exports.deleteReview = async (req, res) => {
  try {
  
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    if (!review) {
        return res.status(404).json({ message: "Review not found " });
    }
    
    const menuItem = await MenuItems.findById(review.menuItems);

    const itemIndex = menuItem.customerReviews.findIndex((item) => item.toString() === review._id.toString());
     
    if(itemIndex > -1){
      menuItem.customerReviews.splice(itemIndex,1);
    }
    await menuItem.save();
    
    await Review.findByIdAndDelete(reviewId);
    

    res.status(200).json({ message: "Review deleted successfully" });
} catch (error) {
    res.status(500).json({ message:error.message });
}
  };
