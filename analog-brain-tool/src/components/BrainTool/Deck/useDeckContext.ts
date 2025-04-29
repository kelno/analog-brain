
import { use } from 'react';
import { DeckContext } from './DeckContext';

// can throw
export const useDeckContext = () => {
  const context = use(DeckContext);
  if (!context) {
    throw new Error('useDeckContext must be used within a DeckContextProvider');
  }
  
  console.debug(`Rendering useDeckContext`);

  return context;
};
