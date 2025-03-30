
import { use } from 'react';
import { BrainContext } from './BrainContext';

// can throw
export const useBrainContext = () => {
  const context = use(BrainContext);
  if (!context) {
    throw new Error('useBrainContext must be used within a BrainContextProvider');
  }
  return context;
};
