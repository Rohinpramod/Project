import React, { useState } from "react";
import AddressSection from "./AddressSection";
import CouponSection from "./CouponSection";
import useFetch from "../../../hooks/UseFetch";
import PriceDetails from "./PriceDetails";
import { useLocation } from "react-router-dom";

function CheckoutPage() {
  const location = useLocation();
  const { cart } = location.state || {};
  console.log("log",cart);
  

  // if (!cart) {
  //   return <p>No cart data available. Redirect to the cart page!</p>;
  // }

  const [savedAddresses, isLoading, error] = useFetch("/address/addresses");
  console.log("savedAddresses", savedAddresses);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen bg-gray-50 p-6">
      {/* Address Section */}
      <div className="col-span-2 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <AddressSection savedAddresses={savedAddresses} />
      </div>
      {/* Coupon Section */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Price Details</h2>
        <PriceDetails />
        <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
        <CouponSection />
      </div>
    </div>
  );
}

export default CheckoutPage;
