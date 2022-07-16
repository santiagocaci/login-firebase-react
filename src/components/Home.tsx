import React from 'react';

import { useAuth } from '../context/AuthProvider';

const getUserNameByEmail = (email: string) => email.split('@')[0];

export const Home: React.FC = () => {
  const { logOut, user, isLoading } = useAuth()!;
  const email = user?.email ?? '';
  const handleLogout = async () => {
    await logOut();
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div className='w-full max-w-md m-auto bg-slate-900 p-5 rounded-md text-white'>
      <h1 className='text-4xl text-center'>
        welcome {getUserNameByEmail(email)}
      </h1>
      <button onClick={handleLogout} className='border-b-2 text-lg mt-5'>
        Logout
      </button>
    </div>
  );
};
