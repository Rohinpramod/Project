import React, { useState, useEffect } from "react";
import RestaurantCard from "../../components/user/RestaurantCard";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductSkelton } from "../../components/shared/Skelton";
import useFetch from "../../hooks/useFetch";


const AllRestaurantPage = () => {
  const [restaurants,isLoading,error] = useFetch('/restaurant/')
  console.log('restaurants',restaurants)
 
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filterType, setFilterType] = useState("all"); // Cuisine filter


  // Handle search 
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(value)
    );
    setFilteredRestaurants(filtered);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);

    if (value === "all") {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(
        (restaurant) => restaurant.cuisine.toLowerCase() === value.toLowerCase()
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">All Restaurants</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="all">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
        </select>
      </div>
      <div className="flex flex-wrap md:gap-10 mt-5">
        { isLoading ? (
             <ProductSkelton />
        ) : (
          <>
            {restaurants?.map((item)=> (
            <RestaurantCard data={item} key={item._id}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllRestaurantPage;
