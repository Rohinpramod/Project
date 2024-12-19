import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { axiosInstance } from "../../../config/axiosInstance";
import SavedAddresses from "./SavedAdress";

const ProfilePage = () => {

  const [profile, isLoading, error] = useFetch('/user/profile');
  console.log("profile====",profile);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 md:flex items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <img
            className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
            src={profile?.data.profile.profilePic}
            alt="Profile"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile?.data.profile.name}</h1>
         
        </div>
      </div>

      {/* Profile Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Your Orders</h2>
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
            <Link to="/order">
            <button className="btn bg-orange-400 text-white hover:bg-orange-500  px-4 py-2 rounded-md">
              View  Orders
            </button>
            </Link>
            
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
          <Link to="/contact">
          <button className="btn bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md">
              Edit Settings
            </button>
          </Link>
          </div>
        </div>

         {/* saved addressss */}
         <div>
          <SavedAddresses addresses={profile?.data.addresses}/>
         </div>
      </div>
    </div>
  );
};

export default ProfilePage;
