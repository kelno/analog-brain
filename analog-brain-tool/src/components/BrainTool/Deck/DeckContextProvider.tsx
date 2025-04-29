import { useState, ReactNode } from 'react';
import { DeckContextData, DeckContextState } from './DeckContextData';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../../types/Card/ICard';
import { UrlManager } from '../../../utils/UrlManager/UrlManager';
import { UrlParams } from '../../../utils/UrlManager/UrlParams';
import { IDeck } from '../../../types/Deck';
import { DeckContext } from './DeckContext';

export const DeckContextProvider: React.FC<{ deck: IDeck; children: ReactNode }> = ({ deck, children }) => {
  console.debug('rendering DeckContextProvider');

  return <DeckContextCore deck={deck}>{children}</DeckContextCore>;
};

// can throw
// This provider will generate a fresh new context every time it's re rendered
export const DeckContextCore: React.FC<{
  children: ReactNode;
  deck: IDeck;
}> = ({ children, deck }) => {
  console.debug('Rendering DeckContextCore');

  const urlCurrentCard = UrlManager.consumeParam(UrlParams.CARD);
  // TODO: validate card from the URL

  const defaultCardId = urlCurrentCard ?? deck.cards[0].id;

  const [deckState, setDeckState] = useState<DeckContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
  });

  const deckContext: DeckContextData = new DeckContextData(deckState, setDeckState, deck);

  return <DeckContext.Provider value={deckContext}>{children}</DeckContext.Provider>;
};
