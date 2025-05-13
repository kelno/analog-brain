
import { use } from 'react';
import { DeckContext } from './DeckContext';
import { DeckContextData } from './DeckContextData';

// can throw
export const useDeckContext = (deckId: string) : DeckContextData => {
  console.debug(`Rendering useDeckContext with id ${deckId}`);

  if (deckId === undefined)
    throw new Error('useDeckContext received no deckId');

  const context = use(DeckContext);
  if (!context) {
    throw new Error('useDeckContext must be used within a DeckContextProvider');
  }
  
  return context;
};
