import React from "react";

const OrderDetails = () => {
  // Sample orders data
  const orders = [
    {
      id: 1,
      restaurantName: "The Gourmet Kitchen",
      items: ["Margherita Pizza", "Garlic Bread"],
      totalAmount: 548,
      status: "Preparing",
      estimatedTime: "25 mins",
    },
    {
      id: 2,
      restaurantName: "Skyline Dine",
      items: ["Sushi Platter", "Miso Soup"],
      totalAmount: 1098,
      status: "On the Way",
      estimatedTime: "15 mins",
    },
    {
      id: 3,
      restaurantName: "Taste Haven",
      items: ["Butter Chicken", "Naan"],
      totalAmount: 700,
      status: "Delivered",
      estimatedTime: "Delivered 2 hours ago",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{order.restaurantName}</h2>
                <p className={`px-3 py-1 text-sm font-semibold rounded-md ${
                  order.status === "Preparing"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "On the Way"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-green-200 text-green-800"
                }`}>
                  {order.status}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-500">Items:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  Total: ₹{order.totalAmount}
                </p>
                <p className="text-gray-500">{order.estimatedTime}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
