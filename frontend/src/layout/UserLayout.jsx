import React, { useEffect, useState } from 'react'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../components/user/Header'
import UserHeader from '../components/user/UserHeader'
import { axiosInstance } from '../config/axiosInstance'


const UserLayout= () => {
  
  const [isUserAuth,setIsUserAuth] = useState(true)

  return (
    <div>
      {isUserAuth?<UserHeader />:<Header />} 
      <div className='min-h-96'>
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;