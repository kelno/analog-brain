
import { use } from 'react';
import { AppContext } from '../store/AppContext';

// can throw
export const useAppContext = () => {
  const context = use(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
