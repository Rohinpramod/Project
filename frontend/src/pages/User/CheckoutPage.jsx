import React, { useState } from 'react';

const CheckoutPage = () => {
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [coupon, setCoupon] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleApplyCoupon = () => {
    // Simulate coupon validation
    if (coupon === 'SAVE10') {
      setDiscountMessage('Coupon applied! You get 10% off.');
    } else {
      setDiscountMessage('Invalid coupon code.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout Page</h1>

      {/* Address Section */}
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={address.name}
            onChange={handleAddressChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Street:</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            placeholder="Street Address"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">City:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            placeholder="City"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">State:</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            placeholder="State"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">ZIP Code:</label>
          <input
            type="text"
            name="zip"
            value={address.zip}
            onChange={handleAddressChange}
            placeholder="ZIP Code"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
      </form>

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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply Coupon
        </button>
      </div>

      {/* Discount Message */}
      {discountMessage && <p className="mt-4 text-green-600">{discountMessage}</p>}
    </div>
  );
};

export default CheckoutPage;
