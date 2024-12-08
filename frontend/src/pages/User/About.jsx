import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Hero Section */}
      <div className="bg-orange-400 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg">
          Discover how we bring delicious food to your doorstep with just a few clicks!
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-8 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-7">
          At <span className="font-semibold">Foodie Express</span>, we believe that good food can
          create unforgettable moments. Founded in 2020, we started with a simple mission: to make
          quality meals accessible to everyone. Whether it’s a cozy dinner at home or a celebration
          with friends, we deliver a variety of dishes right to your doorstep.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Our Mission"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-7">
            We aim to provide a seamless and satisfying food delivery experience for everyone.
            Partnering with the best local restaurants, we ensure every meal is fresh, delicious,
            and delivered on time. From traditional cuisines to exotic flavors, we bring the world
            of food to your fingertips.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-8 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>
            <span className="font-semibold">Variety of Choices:</span> From local favorites to
            international cuisines, we have something for everyone.
          </li>
          <li>
            <span className="font-semibold">Quick Delivery:</span> We ensure that your food arrives
            hot and fresh.
          </li>
          <li>
            <span className="font-semibold">Affordable Prices:</span> Enjoy quality meals at
            reasonable prices.
          </li>
          <li>
            <span className="font-semibold">Customer Support:</span> Our team is here to help with
            any questions or concerns.
          </li>
        </ul>
      </div>

      {/* Our Team Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 1"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">John Smith</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 2"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">Emily Davis</h3>
            <p className="text-gray-600">Head Chef</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 3"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-bold text-lg">Mark Taylor</h3>
            <p className="text-gray-600">Operations Manager</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-12 bg-orange-400 text-white py-6 text-center rounded-lg shadow-md">
        <h2 className="text-lg font-bold">
          Ready to experience the joy of great food? Order now!
        </h2>
        <Link to="/all-restuarant" >
        <button className="mt-4 px-6 py-2 bg-white text-orange-400 font-semibold rounded-md hover:bg-gray-200">
          Browse Restaurants
        </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;