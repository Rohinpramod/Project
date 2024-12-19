import React from 'react';

function SavedAddresses({ addresses }) {
  return (
        <>
            <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Saved Addresses</h2>
            {addresses?.length > 0 ? (
              <ul className="text-gray-600 space-y-2">
                {addresses?.map((address) => (
                  <li key={address._id} className="border-b pb-2 mb-2">
                    <p>
                      <span className="font-medium">{address.name}:</span> {address.street}, {address.city}, {address.state} - {address.postalCode}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No addresses found.</p>
            )}
          </div>
          </>
  );
}

export default SavedAddresses;
