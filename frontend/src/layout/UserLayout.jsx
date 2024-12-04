import React, { useState } from 'react'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../components/user/Header'
import UserHeader from '../components/user/UserHeader'


const UserLayout= () => {
  
  const [isUserAuth,setIsUserAuth] = useState(true)
  return (
    <div>
      {isUserAuth?<UserHeader />:<Header />} 
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;