// CompoundProvider.js
import React from 'react';
import { UserProvider } from './userProvider';
import { OtherProvider } from './otherProvider';

export const CompoundProvider = ({ children }: any) => {
  return (
    <UserProvider>
      <OtherProvider>
        {children}
      </OtherProvider>
    </UserProvider>
  );
};