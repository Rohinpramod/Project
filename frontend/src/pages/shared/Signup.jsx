import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

const SignUpPage = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile:'',
    role: 'user', // Default role is 'user'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (value) => {
    value.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/user/signup', formData);
      if (response.data.success) {
        setMessage('Signup successful!');
        setFormData({ name: '', email: '', password: '',mobile:'', role: 'user' }); // Reset form
      } else {
        alert(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      if ("message:user already exist") {
        alert('User already exists. Please login instead.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
      }finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Sign Up</h2>
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
      <div className="p-4">
        {message && (
          <div
            className={`p-2 mb-4 text-sm text-center rounded-md ${
              message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="string"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your Mobile Number"
              required
            />
          </div>
         
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-orange-600 text-white font-medium rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'
            }`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
