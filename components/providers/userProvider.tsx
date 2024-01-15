// UserProvider.js
import { User } from '@/types';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    name: '',
  }); // Set initial user details

  const updateUserDetails = (newUserDetails: User) => {
    setUser(newUserDetails);
  };

  return (
    <UserContext.Provider value={{ user, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};