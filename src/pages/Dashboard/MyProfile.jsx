import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4 pt-14 '>My Profile</h1>
      <div className='space-y-4'>
        <div>
          <img src={user.photoURL} alt='Profile' className='w-32 h-32 rounded-full' />
        </div>
        <div>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Agreement Accept Date:</strong> None</p>
          <p><strong>Rented Apartment Info:</strong> None</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;