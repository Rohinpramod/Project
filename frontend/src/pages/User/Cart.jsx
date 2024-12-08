import React, { useState } from "react";
import { IoTrashBin } from "react-icons/io5";

const CartPage = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      quantity: 1,
      image: "https://th.bing.com/th/id/OIP.MfhIfzrC6x6T1-szQkjtCgHaEo?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Chicken Biryani",
      price: 249,
      quantity: 1,
      image: "https://th.bing.com/th/id/OIP.M5P3yI6QSzcItNnqOMVz4gHaLG?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      price: 99,
      quantity: 2,
      image: "https://twocupsflour.com/wp-content/uploads/2019/06/web-brownies-189.jpg",
    },
  ]);

  // Function to handle quantity change
  const updateQuantity = (id, increment) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
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
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
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
                <p className="text-gray-500">₹{item.price}</p>
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
                  ₹{item.price * item.quantity}
                </p>
                {/* <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button> */}
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
            <button className="mt-4 px-6 py-2 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-orange-500">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
