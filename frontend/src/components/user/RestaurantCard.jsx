import React from 'react';

const RestaurantCard = ({data}) => {
  return (
    <div className={`card-res  w-60 shadow-xl`}>
      <figure>
        <img 
          className="w-full h-[15vh] object-cover" 
          src={data.image} 
          alt={data.title} 
        />
      </figure>
      <div className={`card-body flex justify-center`}>
        <h2 className='text-center font-bold'>
          {data.title}
        </h2>
        <h4>
          {data.cusine}
        </h4>
        <h4>
          {data.rating}
        </h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
