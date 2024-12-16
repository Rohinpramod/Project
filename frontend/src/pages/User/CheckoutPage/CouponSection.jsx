import React, { useState } from "react";

function CouponSection() {
  const [coupon, setCoupon] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
  const handleApplyCoupon = async () => {
    setLoading(true);
    // Simulate backend coupon validation
    setTimeout(() => {
      if (coupon === 'SAVE10') {
        setDiscountMessage('Coupon applied! You get 10% off.');
      } else {
        setDiscountMessage('Invalid coupon code.');
      }
      setLoading(false);
    }, 1000);
  };
  return (
    <div>
      {/* Coupon Section */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Coupon</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-grow px-4 py-2 border rounded"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          disabled={loading}
          className={`px-4 py-2 ${
            loading ? "bg-gray-400" : "bg-orange-600"
          } text-white rounded`}
        >
          {loading ? "Validating..." : "Apply Coupon"}
        </button>
      </div>

      {/* Discount Message */}
      {discountMessage && (
        <p className="mt-4 text-red-600">{discountMessage}</p>
      )}
    </div>
  );
}

export default CouponSection;
