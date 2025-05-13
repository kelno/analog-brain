
import { use } from 'react';
import { DeckContext } from './DeckContext';
import { DeckContextData } from './DeckContextData';

// can throw
export const useDeckContext = () : DeckContextData => {
  console.debug(`Rendering useDeckContext`);

  const context = use(DeckContext);
  if (!context) {
    throw new Error('useDeckContext must be used within a DeckContextProvider');
  }
  
  return context;
};
