import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 md:flex items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <img
            className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">Jane Doe</h1>
          <div className="mt-4">
            <button className="btn bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Favorite Dishes */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Favorite Dishes</h2>
          <ul className="text-gray-600 space-y-4">
            <li className="flex items-center gap-4">
              <img
                className="w-16 h-16 rounded-md"
                src="https://via.placeholder.com/80"
                alt="Pizza"
              />
              <span>Margherita Pizza</span>
            </li>
            <li className="flex items-center gap-4">
              <img
                className="w-16 h-16 rounded-md"
                src="https://via.placeholder.com/80"
                alt="Burger"
              />
              <span>Cheeseburger</span>
            </li>
            <li className="flex items-center gap-4">
              <img
                className="w-16 h-16 rounded-md"
                src="https://via.placeholder.com/80"
                alt="Sushi"
              />
              <span>Salmon Sushi</span>
            </li>
          </ul>
        </div>

        {/* Order History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Order History</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Order #12345:</span> Margherita Pizza - ₹350
            </li>
            <li>
              <span className="font-medium">Order #12346:</span> Salmon Sushi - ₹500
            </li>
            <li>
              <span className="font-medium">Order #12347:</span> Cheeseburger - ₹250
            </li>
          </ul>
          <div className="mt-4">
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              View All Orders
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Account Settings</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Email:</span> jane.doe@example.com
            </li>
            <li>
              <span className="font-medium">Phone:</span> +1 234 567 890
            </li>
            <li>
              <span className="font-medium">Address:</span> 123 Foodie Street, City
            </li>
          </ul>
          <div className="mt-4">
            <button className="btn bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md">
              Edit Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;