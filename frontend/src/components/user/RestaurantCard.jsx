import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({data}) => {

  
  
  return (
    <div className={`card-res  w-60 shadow-xl`}>
      <Link to={`/restaurantPage/${data?._id}`} >
      <figure>
        <img 
          className="w-full h-[15vh] object-cover" 
          src={data.image} 
          alt="restaurant"
        />
      </figure>
      <div className={`card-body flex justify-center`}>
        <h2 className='text-center font-bold text-black'>{data.name}</h2>
        <h4>{data.location}</h4>
        <h4 className="font-mono text-gray-400">{data.cuisine}</h4>
        <h4 className="font-mono text-gray-400">{data.rating}</h4>
      </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
