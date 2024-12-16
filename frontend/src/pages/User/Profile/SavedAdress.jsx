import React from 'react';

function SavedAddresses({ addresses }) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold  mb-4">Saved Addresses</h2>
      <ul className="space-y-4">
        {addresses?.map((address, index) => (
          <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div>
              <p className="">{address?.street}</p>
              <p className="">{address?.city}, {address?.state} {address?.zipCode}</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedAddresses;
