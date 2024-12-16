import React, { useState } from "react";
import RestaurantCard from "../../components/user/RestaurantCard";
import { ProductSkelton } from "../../components/shared/Skelton";
import useFetch from "../../hooks/UseFetch";

const AllRestaurantPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  // Dynamically pass search and filter params
  const [restaurants, isLoading, error] = useFetch("/restaurant/", {
    search: searchQuery,
    cuisine: selectedCuisine !== "all" ? selectedCuisine : undefined,
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">All Restaurants</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchQuery}
          onChange={handleSearch} // Update state on search
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={selectedCuisine}
          onChange={handleCuisineChange} // Update state on cuisine change
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
        {isLoading ? (
          <ProductSkelton />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : restaurants && restaurants.length > 0 ? (
          restaurants.map((item) => (
            <RestaurantCard data={item} key={item._id} />
          ))
        ) : (
          <div>No restaurants found.</div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurantPage;
