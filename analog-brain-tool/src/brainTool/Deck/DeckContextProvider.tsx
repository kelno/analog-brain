import { useState, ReactNode, useEffect } from 'react';
import { DeckContextData, DeckContextState } from './DeckContextData';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../types/Card/ICard';
import { IDeck } from '../../types/Deck';
import { DeckContext } from './DeckContext';
import { useParams } from 'react-router';
import { useBrainContext } from '../store/useBrainContext';
import { useDeckManager } from '../../deckManager/useDeckManager';
import { useAppContext } from '../../appContext/useAppContext';
import { RouteFallback } from '../routing/RouteFallback';
import { useTranslation } from 'react-i18next';

/**
 * Resolves the route's deck against the active language before creating deck
 * state. Missing decks remain a recoverable routing state and never enter the
 * deck context.
 */
export const DeckContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { deckId } = useParams<{ deckId: string }>();
  const deckManager = useDeckManager();
  const { language } = useAppContext();
  const { t } = useTranslation();
  const deck = deckId ? deckManager.getDeckById(language, deckId) : undefined;

  if (!deck) {
    return (
      <RouteFallback title={t('routing.deckNotFoundTitle')}>
        {t('routing.deckNotFoundMessage', { deckId })}
      </RouteFallback>
    );
  }

  console.debug(`Rendering DeckContextProvider for deck ${deck.id}`);

  return <DeckContextLoader deck={deck}>{children}</DeckContextLoader>;
};

const DeckContextLoader: React.FC<{ deck: IDeck; children: ReactNode }> = ({ deck, children }) => {
  const brainContext = useBrainContext();

  useEffect(() => {
    if (brainContext.currentDeckId !== deck.id) {
      brainContext.selectDeck(deck.id, true);
    }
  }, [brainContext, deck.id]);

  if (brainContext.currentDeckId !== deck.id) {
    return null;
  }

  return <DeckContextCore deck={deck}>{children}</DeckContextCore>;
};

const DeckContextCore: React.FC<{
  children: ReactNode;
  deck: IDeck;
}> = ({ children, deck }) => {
  console.debug('Rendering DeckContextCore');

  const defaultCardId = deck.cards[0].id;

  const [deckState, setDeckState] = useState<DeckContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
  });

  const deckContext: DeckContextData = new DeckContextData(deckState, setDeckState, deck);

  return <DeckContext.Provider value={deckContext}>{children}</DeckContext.Provider>;
};
