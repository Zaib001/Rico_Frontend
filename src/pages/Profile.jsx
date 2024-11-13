import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout} className="mt-4 bg-red-500 p-2">
        Logout
      </button>
    </div>
  );
};

export default Profile;
