import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Data from "../../../src/data/data";
import SimpleSlider from "../../components/slider/slider";
import RestaurantCard from "../../components/user/RestaurantCard";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/UseFetch";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  // Fetch restaurants based on the search query and cuisine filter
  const [restaurants, isLoading, error] = useFetch("/restaurant/", {
    cuisine: selectedCuisine !== "all" ? selectedCuisine : undefined,
  });

  const navigate = useNavigate();

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to navigate to the restaurant page
  const handleRestaurantClick = (id) => {
    navigate(`/restaurantPage/${id}`);
  };

  // Filtered restaurants based on search query (only for the search results)
  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="cover flex items-center justify-center relative">
        <div className="">
          <input
            type="text"
            className="search p-4 rounded-5 focus:outline-none"
            placeholder="Search for Restaurant, item or more"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CiSearch
            style={{ color: "black" }}
            className="size-5 relative inline-block -left-12 inset-y-0"
          />

          {/* Search Results Display Below the Search Bar */}
          {searchQuery && (
            <div className="search-results absolute bg-white w-96 mt-2 p-4 rounded-md shadow-lg">
              <h2 className="font-bold text-xl">Search Results:</h2>
              <div className="flex flex-wrap mt-2">
                {filteredRestaurants?.length ? (
                  filteredRestaurants.map((item) => (
                    <div
                      key={item._id}
                      className="restaurant-item cursor-pointer"
                      onClick={() => handleRestaurantClick(item._id)}
                    >
                      <p className="text-blue-500 cursor-pointer">
                        {item.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Full List of Restaurants Below the Search Results */}
      <div className="container mx-auto mt-3">
        <div>
          <h1 className="font-bold text-2xl py-10">
            Order our best food options
          </h1>
          <SimpleSlider data={Data} />
        </div>
        <div>
          <h1 className="mt-5 font-bold text-2xl">Restaurants</h1>
          <div className="flex flex-col md:flex-row md:gap-10 mt-5 gap-4">
            {/* Display full restaurant list, unaffected by search */}
            {restaurants?.map((item) => (
              <RestaurantCard
                data={item}
                key={item._id}
                onClick={() => handleRestaurantClick(item._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
