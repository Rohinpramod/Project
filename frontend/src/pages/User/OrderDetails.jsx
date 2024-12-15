import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../config/axiosInstance';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance('order/get-all-order'); // Adjust endpoint as needed
            
                console.log("response====",response)
                console.log("orders====",response.data.orders)
                
                setOrders(response.data);
               
            } catch (err) {
                console.error('Failed to fetch orders', err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="order-page">
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.order_id} className="order">
                        <h2>Order #{order.order_id}</h2>
                        <p>Status: {order.status}</p>
                        <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.food_item_id}>
                                    {item.food_name} - {item.quantity} x ${item.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderDetails;
