import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const MenuCard = ({ menucard }) => {
  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post("cart/add-to-cart", {
        foodId: menucard._id, 
        restaurantId: menucard.restaurant, 
        quantity: 1, 
      });
      toast.success('Item added to cart')
      // if (response.status === 200) {
      //   alert("Item added to cart successfully!");
      //   console.log("Cart Details:", response.data.cart);
      // } else {
      //   alert(response.data.message || "Failed to add item to cart.");
      // } 
      console.log("response===",response);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="">
      <div className="card lg:card-side ma bg-base-100 shadow-xl">
        <figure>
          <img className="w-64" src={menucard.image} alt={menucard.name} />
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
            <p>{menucard.description}</p>
          </div>
          <div className="card-actions justify-end absolute top-0 right-0 m-2">
            <button className="btn bg-orange-400" onClick={onSubmit}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
