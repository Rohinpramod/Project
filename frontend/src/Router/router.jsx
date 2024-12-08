import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/User/Home';
import About from '../pages/User/About';
import Cart from '../pages/User/Cart';
import Contact from '../pages/User/Contact';
import OrderDetails from '../pages/User/orderDetails';
import SearchPage from '../pages/User/SearchPage';
import Signup from '../pages/shared/Signup';
import Login from '../pages/shared/Login';
import Profile from '../pages/User/Profile';
import Payment from '../pages/User/Payment';
import UserLayout from '../layout/UserLayout';
import ErrorPage from '../pages/shared/ErrorPage';
import AllRestaurants from '../pages/User/AllRestaurants';
import RestaurantPage from '../pages/User/RestaurantPage';


 const router = createBrowserRouter([
    {
        path:"/",
        element:<UserLayout />,
        errorElement:<ErrorPage />,
        children: [
            {
                path:"",
                element:<Home />
            },
            {
            path:"signup",
                element:<Signup />
            },
            {
                path:"login",
                element:<Login />
            },
            {
                path:"profile",
                element:<Profile />
            },
            {
                path:"about",
                element:<About />
            },
            {
                path:"search",
                element:<SearchPage />
            },
            {
                path:"cart",
                element:<Cart />
            },
            {
                path:"address",
                element:""
            },
            {
                path:"order",
                element:<OrderDetails />
            },
            {
                path:"payment",
                element:<Payment />
            },
            {
                path:"all-restuarant",
                element:<AllRestaurants />
            },
            {
                path:"restaurant-page",
                element:<RestaurantPage />
            }
        ]
    }


        

   
]);

export default  router ;

