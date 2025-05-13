import { useState, ReactNode, useEffect } from 'react';
import { DeckContextData, DeckContextState } from './DeckContextData';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../types/Card/ICard';
import { IDeck } from '../../types/Deck';
import { DeckContext } from './DeckContext';
import { useNavigate, useParams } from 'react-router';
import { useBrainContext } from '../store/useBrainContext';
import { toast } from 'sonner';
import { BrainToolError, BrainToolErrorType } from '../error/BrainToolError';

/* DeckContextProvider gives a unique deckContext depending on the given id in params.
 Specifically it handles the routing input, then delegates to DeckContextLoader.
 expects id as Router param
 Can Throw
*/
export const DeckContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    // Instead of throwing, we navigate back to selection
    navigate('/');
    console.error('DeckContextProvider tried to load with no id provided.');
    return null;
  }

  console.debug(`Rendering DeckContextProvider for deck ${id}`);

  return <DeckContextLoader deckId={id}>{children}</DeckContextLoader>;
};

// This one handles selecting the current deck
const DeckContextLoader: React.FC<{ deckId: string; children: ReactNode }> = ({ deckId, children }) => {
  const navigate = useNavigate();
  const brainContext = useBrainContext();

  useEffect(() => {
    if (brainContext.currentDeckId != deckId) {
      const success = brainContext.selectDeck(deckId, true);
      if (!success)
        throw new BrainToolError('Failed to select deck', BrainToolErrorType.DECK_FAILED_TO_SELECT);
    }
  });

  if (brainContext.currentDeckId != deckId) {
    return null; // wait for refresh
  }

  const currentDeck = brainContext.currentDeck;
  if (!currentDeck) {
    navigate('/');
    console.error(`DeckContextProvider tried to load deck id ${deckId} but brain context failed to load it?`);
    toast.error('Failed to load deck'); //TODO translate
    return null;
  }

  return <DeckContextCore deck={currentDeck}>{children}</DeckContextCore>;
};

// This one actually
const DeckContextCore: React.FC<{
  children: ReactNode;
  deck: IDeck;
}> = ({ children, deck }) => {
  console.debug('Rendering DeckContextCore');

  const urlCurrentCard = null; //UrlManager.consumeParam(UrlParams.CARD);
  // TODO: validate card from the URL

  const defaultCardId = urlCurrentCard ?? deck.cards[0].id;

  const [deckState, setDeckState] = useState<DeckContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
  });

  const deckContext: DeckContextData = new DeckContextData(deckState, setDeckState, deck);

  return <DeckContext.Provider value={deckContext}>{children}</DeckContext.Provider>;
};
