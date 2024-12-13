import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchCartItems = async()=>{
    try{
      setLoading(true);
      const response = await axiosInstance({
        url:"/cart/get-cart-items"
      });
      console.log("response=====",response)

      setCartItems(response?.data.data)
      setLoading(false);
    }catch(error){
      console.log(error)
    }
  };
 
  console.log("cartItems====",cartItems);
  console.log('cartItems.items',cartItems.items)

  useEffect(()=>{
    fetchCartItems();
  },[]);


  // Function to handle quantity change
  const updateQuantity = (id, increment) => {
    const updatedItems = cartItems.items.map((item) => {
      if (item._id === id) {
        const newQuantity = increment
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };


  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems?.items.reduce(
      (total, item) => total + item.totalItemPrice * item.quantity,
      0
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.items.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-grow ml-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500">₹{item.totalItemPrice
                }</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => updateQuantity(item.id, false)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => updateQuantity(item.id, true)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold">
                  ₹{item.totalItemPrice* item.quantity}
                </p>
                
                <IoTrashBin
                className=" hover: cursor-pointer relative transition ease-in-out delay-15 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover: duration-300 ...  "
                onClick={()=> removeItem(item.id)}
                />

              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total: ₹{calculateTotal()}
            </p>
            <Link to="/checkout">
            <button className="mt-4 px-6 py-2 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-orange-500">
              Proceed to Checkout
            </button> 
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
