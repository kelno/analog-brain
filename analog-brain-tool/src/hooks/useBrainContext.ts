
import { useContext } from 'react';
import BrainContext from '../store/BrainContext';

export const useBrainContext = () => {
  const context = useContext(BrainContext);
  if (!context) {
    throw new Error('useBrainContext must be used within a BrainContextProvider');
  }
  return context;
};
