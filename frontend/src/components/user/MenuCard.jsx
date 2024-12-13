import React from "react";

const MenuCard = ({ menucard }) => {
  console.log(menucard)
  return (
    <div>
      <div className="card lg:card-side ma bg-base-100 shadow-xl">
        <figure>
          <img className="w-80" src={menucard.image} alt={menucard.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title mb-0">{menucard.name}</h2>

          <div className="rating size-14 mt-0">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
            <div>
                <p>₹ {menucard.price}</p>
                <p>{menucard.description} </p>
            </div>
          <div className="card-actions justify-end  absolute top-0 right-0 m-2">
            <button className="btn bg-orange-400">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
