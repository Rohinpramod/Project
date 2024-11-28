const mongoose = require('mongoose');

const MenuItems = require('../models/menuItemModel');
const Review = require('../models/reviewModel');

// Create a new review
exports.addReview = async (req, res) => {
    try {
      const { menuItems, rating, comment } = req.body;
      const userId = req.user.id;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const foundMenuItem = await MenuItems.findById(menuItems);
      if (!foundMenuItem) {
        return res.status(404).json({ message: "Restaurant not found" });
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

      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json({ message:error.message });
    }
  };
  
  // Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate("user", "email") 
        .populate("restaurant", "name");
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error,message });
    }
  };
  
  // Get reviews by user ID
  const getUserReviews = async (req, res) => {
    try {
      const userId = req.userId || req.query.userId; // Assuming `userId` is passed from middleware or query
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const userReviews = await Review.find({ user: userId }).populate(
        "restaurant",
        "name location"
      );
  
      res.status(200).json(userReviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user reviews", error });
    }
  };
  
  // Update a review
  const updateReview = async (req, res) => {
    try {
      const userId = req.userId || req.body.userId; // Assuming `userId` is passed
      const { rating, comment } = req.body;
  
      const review = await Review.findById(req.params.id);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      // Ensure the logged-in user owns the review
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "Forbidden: Not your review" });
      }
  
      review.rating = rating || review.rating;
      review.comment = comment || review.comment;
  
      const updatedReview = await review.save();
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: "Failed to update review", error });
    }
  };
  
  // Delete a review
  const deleteReview = async (req, res) => {
    try {
      const userId = req.userId || req.query.userId; // Assuming `userId` is passed
  
      const review = await Review.findById(req.params.id);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      // Ensure the logged-in user owns the review
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "Forbidden: Not your review" });
      }
  
      await review.deleteOne();
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete review", error });
    }
  };

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.params;

        const reviews = await Review.find({ courseId });
        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this course" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ messsage:'average review fetched', data:averageRating });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};