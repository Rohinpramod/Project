import React from "react";
import { CiSearch } from "react-icons/ci";
import Data from "../../../src/data/data";
import Card from "../../components/user/Card";
import RestData from "../../data/ResData";

import coverPhoto from "../../../src/assets/images/coverPhoto.jpg";
import FoodCarousel from "../../components/slider/slider";
import SimpleSlider from "../../components/slider/slider";
import RestaurantCard from "../../components/user/RestaurantCard";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:2000,
  navigator:true,
};

const data = [];
const Home = () => {
  return (
    <div>
      <div className="cover flex items-center justify-center  ">
        <div className="">
          <input
            type="text"
            className="search p-4 rounded-5 "
            placeholder="Search for Resturant,item or more "
          ></input>
          <CiSearch
            style={{ color: "black" }}
            className=" size-5 relative inline-block -left-12  inset-y-0"
          />
        </div>
      </div>

      <div className="container  flex-wrap  mx-auto mt-3">
        <h1 className="font-bold text-2xl my-5">Order our best food options</h1>

        <SimpleSlider
          data={Data}
          settings={settings}
          renderItem={(item) => (
            <Card key={item.title} image={item.image} title={item.title} />
          )}
        />

        <h1 className="mt-5 font-bold text-2xl">Restaurants</h1>
        <div className='flex flex-wrap md:gap-10 mt-5'> 
              {RestData.map((item)=> <RestaurantCard data={item}/>)}
            </div>
      </div>  
      
    </div>
  );
};

export default Home;
