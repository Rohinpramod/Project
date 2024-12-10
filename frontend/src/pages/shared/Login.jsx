import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Link } from 'react-router-dom';

const Login = ({ isOpen, onClose, onOpenSignUp }) => {
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async(value)=>{
    value.preventDefault();
    setError('');
    setLoading(true);
    try{
      const response = await axiosInstance.post('/user/login',{
        email,
        password,
      });
      console.log(response)
      if(response.data.message === ' Login succssfully'){
        alert("login successful")
      }
    }catch(error){
      console.log(error.message);
      alert(error.message)
    }finally{
      onClose();
    }
  }
  

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Login</h2>
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
      <div className="p-4">
        <form className="space-y-4"onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit "
            className="w-full py-2 bg-orange-400 text-white font-medium rounded-md hover:bg-orange-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-orange-400 hover:underline focus:outline-none"
            onClick={() => {
              onClose(); // Close login panel
              onOpenSignUp(); // Open sign-up panel
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
