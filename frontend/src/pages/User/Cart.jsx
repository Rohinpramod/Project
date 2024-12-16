import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import Toast from "react-hot-toast";
import { showAlert } from "../../utils/sweetAlert";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(null); // Initialize as null to handle loading state
  const [loading, setLoading] = useState(false);
  console.log("cartItems",cartItems);
  

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: "/cart/get-cart-items",
      });
      console.log("responseeeeeee",response);
      setCartItems(response?.data.data || null); // Set cartItems or null if cart is empty
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Handle quantity change (increment/decrement)
  const updateQuantity = async (foodId, action) => {
    try {
      const response = await axiosInstance.post("/cart/add-quantity", {
        foodId,
        action,
      });
      Toast.success("Done");
      setCartItems(response?.data.cart); // Update cartItems with updated cart
    } catch (error) {
      console.error(error);
    }
  };

  // Remove an item from the cart
  const removeItem = async (foodId) => {
    console.log(foodId);
    try {
      // Show confirmation alert
      const result = await showAlert("confirmDeletion");

      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        const response = await axiosInstance.delete(
          `cart/delete-cart-items/${foodId}`
        );
        console.log("response", response);

        if (response?.data.cart) {
          setCartItems(response.data.cart); // Update cart if there are items left
        } else {
          setCartItems(null); // Set cartItems to null if the cart is empty
        }

        // Show success alert
        await showAlert("deletionSuccess");
      }
    } catch (error) {
      console.error(error);

      // Show error alert if an exception occurs
      await showAlert("deletionError");
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems?.items.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {!cartItems ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.items.map((item) => (
     
            <div
              key={item.foodId._id} // Use the foodId as the key
              className="flex items-center justify-between border-b pb-4"
            >
              <img
                src={item.foodId.image} // Update with actual property name
                alt={item.foodId.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-grow ml-4">
                <h2 className="text-xl font-semibold">{item.foodId.name}</h2>
                <p className="text-gray-500">₹{item.totalItemPrice}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => updateQuantity(item.foodId._id, "decrement")}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => updateQuantity(item.foodId._id, "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-semibold">₹{item.totalItemPrice}</p>
                <IoTrashBin
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={() => removeItem(item.foodId._id)}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">Total: ₹{calculateTotal()}</p>
            <Link
              to={{
                pathname: "/checkout",
                state: { cart: cartItems },
              }}
            >
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
