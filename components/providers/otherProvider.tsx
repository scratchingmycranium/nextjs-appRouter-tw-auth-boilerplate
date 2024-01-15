// OtherProvider.js
import React, { createContext, useContext } from 'react';

const OtherContext = createContext({});

export const OtherProvider = ({ children }: any) => {
  // Provider logic here

  return (
    <OtherContext.Provider value={{ /* Provide other-related values/functions */ }}>
      {children}
    </OtherContext.Provider>
  );
};

export const useOther = () => {
  const context = useContext(OtherContext);
  if (!context) {
    throw new Error('useOther must be used within an OtherProvider');
  }
  return context;
};