import React, { useState, useEffect } from "react";
import RestaurantCard from "../../components/user/RestaurantCard";
import RestData from "../../data/ResData";
const AllRestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([]); // Full restaurant list
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filterType, setFilterType] = useState("all"); // Cuisine filter

  // Mock data: Replace with API call in real applications
  useEffect(() => {
    const fetchRestaurants = async () => {
      const mockData = [
        { id: 1, name: "Pizza Palace", cuisine: "Italian", rating: 4.5 },
        { id: 2, name: "Sushi Spot", cuisine: "Japanese", rating: 4.8 },
        { id: 3, name: "Curry Corner", cuisine: "Indian", rating: 4.2 },
        { id: 4, name: "Burger Barn", cuisine: "American", rating: 4.0 },
        { id: 5, name: "Taco Time", cuisine: "Mexican", rating: 4.3 },
      ];
      setRestaurants(mockData);
      setFilteredRestaurants(mockData);
    };

    fetchRestaurants();
  }, []);

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
      {RestData.map((item,index)=> <RestaurantCard data={item} key={index}/>)}

      </div>
    </div>
  );
};

export default AllRestaurantPage;
