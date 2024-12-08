import React from "react";
import Data from "../../data/data";
import MenuCard from "../../components/user/MenuCard";



const RestaurantPage = () => {
  return (
    <div className="mt-20 container mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src="https://i.pinimg.com/originals/fe/33/28/fe3328080d12ae8f28a3c7e7fd4f946f.jpg"
          alt="Restaurant"
          className="w-full md:w-60 rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-light">Kuttichira biriyani center</h1>
          <p className="text-gray-600 mt-4">
            Experience the best Italian cuisine in town.
          </p>
        <p  className="text-gray-600 ">Biriyani,Kerala</p>
        <p  className="text-gray-600 ">Location</p>
        
        <div className="rating mt-2">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input
    type="radio"
    name="rating-2"
    className="mask mask-star-2 bg-orange-400"
    defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>

          <div className="mt-6">
            <button className="bg-orange-400 text-white px-6 py-2 rounded-lg">
              Order Online
            </button>
            <button className="bg-orange-400 text-white ms-3 px-6 py-2 rounded-lg">
              Review
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-[30px] text-gray-900 " />
      <h2 className="mt-3 font-semibold text-xl ">Recommended</h2>
        <div className="flex flex-col gap-1 mt-3">
            {Data.map((item,index)=> <MenuCard menucard={item} key={index} />)}
        </div>
    </div>
  );
};

export default RestaurantPage;
