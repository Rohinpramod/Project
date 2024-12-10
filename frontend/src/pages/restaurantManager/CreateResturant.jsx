import React, { useState } from 'react';
import axios from 'axios';

const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cuisine: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('location', formData.location);
      form.append('cuisine', formData.cuisine);
      form.append('image', image);

      const token = localStorage.getItem('authToken'); // Assuming token-based auth

      const response = await axios.post('/api/restaurants', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Restaurant created successfully!');
      setFormData({ name: '', location: '', cuisine: '' });
      setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create a Restaurant</h1>
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating...' : 'Create Restaurant'}
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
