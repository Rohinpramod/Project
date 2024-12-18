import React from "react";

function PriceDetails({ cart }) {
  if (!cart) {
    return <div className="text-center text-gray-500">No cart data available</div>;
  }

  return (
    <div className="price-details bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h3>
      
      {/* Item List */}
      <div className="space-y-2 mb-4">
        {cart.items.map((item) => (
          <div 
            key={item._id} 
            className="flex justify-between items-center"
          >
            <div className="flex-grow">
              <span className="font-medium">{item.foodId.name}</span>
              <span className="text-gray-500 ml-2">
                (x{item.quantity})
              </span>
            </div>
            <span className="font-semibold">
              ₹{item.totalItemPrice}
            </span>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price:</span>
          <span>₹{cart.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;