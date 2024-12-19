import React, { useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import Toast from "react-hot-toast";
import useFetch from "../../../hooks/UseFetch";

function CouponSection({
  orderValue,
  onDiscountApplied,
  selectedCoupon,
  setSelectedCoupon,
}) {
  // const [coupon, setSelectedCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewCoupons, setViewCoupons] = useState(false);
  const [coupons, isLoading, error] = useFetch("/coupon/get-coupon");
  const couponData = coupons?.coupons;

  const handleViewCoupons = () => {
    setViewCoupons(!viewCoupons);
  };

  const applyCoupon = async (code) => {
    setLoading(true);
    setSelectedCoupon(code)
    try {
      const response = await axiosInstance.post("/coupon/apply-coupon", {
        code,
        orderValue,
      });

      if (response) {
        const { discount, finalPrice } = response.data;
        Toast.success(
          `Coupon applied! Discount: ₹${discount}. Final Price: ₹${finalPrice}`
        );
        // Pass the discount and final price back to parent component
        onDiscountApplied(discount, finalPrice);
      } else {
        Toast.error(response.message || "Invalid coupon code.");
      }
    } catch (error) {
      console.log(error);

      Toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleApplyCoupon = () => {
    if (selectedCoupon.trim()) {
      applyCoupon(selectedCoupon);
    } else {
      Toast.error("Please enter a valid coupon code.");
    }
  };

  return (
    <div>
      {/* Coupon Section */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={selectedCoupon || ""}
          onChange={(e) => setSelectedCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-grow px-4 py-2 border rounded"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          disabled={loading}
          className={`px-4 py-2 ${
            loading ? "bg-gray-400" : "bg-orange-400"
          } text-white rounded`}
        >
          {loading ? "Validating..." : "Apply Coupon"}
        </button>
      </div>
      <p
        className="text-sm text-blue-500 cursor-pointer"
        onClick={handleViewCoupons}
      >
        View Coupons
      </p>

      {/* Display Existing Coupons */}
      {couponData && couponData.length > 0 ? (
        <div className="mt-4">
          {viewCoupons && (
            <>
              <h3 className="text-lg font-semibold">Available Coupons:</h3>
              <ul className="space-y-4 mt-2">
                {couponData.map((coupon) => (
                  <li
                    key={coupon._id}
                    className="border p-4 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => applyCoupon(coupon.code)} // Apply coupon on click
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{coupon.code}</span>
                      <span className="text-gray-500">
                        {coupon.discountPercentage}% off
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Min Order Value: ₹{coupon.minOrderValue} | Max Discount: ₹
                      {coupon.maxDiscountValue}
                    </div>
                    <div className="text-xs text-gray-400">
                      Expires on:{" "}
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {coupon.isActive ? "Active" : "Expired"}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4 text-gray-500">No available coupons.</div>
      )}
    </div>
  );
}

export default CouponSection;