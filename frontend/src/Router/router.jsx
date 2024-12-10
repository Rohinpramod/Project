import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/User/Home';
import About from '../pages/User/About';
import Cart from '../pages/User/Cart';
import Contact from '../pages/User/Contact';
import OrderDetails from '../../src/pages/User/OrderDetails';
import SearchPage from '../pages/User/SearchPage';
import Signup from '../pages/shared/Signup';
import Profile from '../pages/User/Profile';
import Payment from '../pages/User/Payment';
import UserLayout from '../layout/UserLayout';
import ErrorPage from '../pages/shared/ErrorPage';
import AllRestaurants from '../pages/User/AllRestaurants';
import RestaurantPage from '../pages/User/RestaurantPage';
import RatingPage from '../pages/User/Rating';
import CreateRestaurant from '../pages/restaurantManager/CreateResturant';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/shared/Login';


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
                path:"/loginPage",
                element:<LoginPage />
            },
            {
                path:"about",
                element:<About />
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
                path:"restaurantPage/:id",
                element:<RestaurantPage />
            },
            {  
                element:<ProtectedRoute />,
                children:[
                    {
                        path:"cart",
                        element:<Cart />
                    },
                    {
                        path:"order",
                        element:<OrderDetails />
                    },
                    {
                        path:"user-profile",
                        element:<Profile />
                    },
                    {
                        path:"contact",
                        element:<Contact />
                    },
                ]
            }
            
        ]
    },


        

   
]);

export default  router ;

