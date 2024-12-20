import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import SavedAddresses from "./SavedAdress";

const ProfilePage = () => {
  const [profile, isLoading, error] = useFetch("/user/profile");
  const [orders, Loading, errors] = useFetch("/order/get-all-order");

  if (isLoading || Loading) {
    return <div>Loading...</div>;
  }

  if (error || errors) {
    return <div>Error loading data: {error?.message || errors?.message}</div>;
  }

  // Get only the last 3 orders
  const lastThreeOrders = orders?.orders?.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 md:flex items-center gap-6">
        <div className="flex justify-center md:justify-start">
          <img
            className="w-32 h-32 rounded-full border-4 border-orange-400 object-cover"
            src={profile?.data.profile.profilePic}
            alt={profile?.data.profile.name}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile?.data.profile.name}</h1>
          <p className="text-gray-600">{profile?.data.profile.email}</p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Your Orders</h2>
          {lastThreeOrders?.length > 0 ? (
            <ul className="text-gray-600 space-y-4">
              {lastThreeOrders.map((order) => (
                <li key={order._id} className="border-b pb-2">
                  <p>
                    <span className="font-medium">Order ID:</span> {order._id}
                  </p>
                  <p>
                    <span className="font-medium">Restaurant:</span>{" "}
                    {order.restaurant?.name}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {order.status}
                  </p>
                  <p>
                    <span className="font-medium">Total Amount:</span> ₹
                    {order.totalAmount}
                  </p>
                  <p>
                    <span className="font-medium">Final Price:</span> ₹
                    {order.finalPrice}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
          <div className="mt-4">
            <Link to="/order">
              <button className="btn bg-orange-400 text-white hover:bg-orange-500 px-4 py-2 rounded-md">
                View All Orders
              </button>
            </Link>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Account Settings</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Name:</span>{" "}
              {profile?.data.profile.name}
            </li>
            <li>
              <span className="font-medium">Email:</span>{" "}
              {profile?.data.profile.email}
            </li>
          </ul>
          <div className="mt-4">
            {/* <Link to="/contact">
              <button className="btn bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md">
                Edit Settings
              </button>
            </Link> */}
          </div>
        </div>
        <SavedAddresses addresses={profile.data.addresses} />
      </div>
    </div>
  );
};

export default ProfilePage;
