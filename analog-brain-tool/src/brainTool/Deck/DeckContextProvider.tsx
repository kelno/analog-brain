import { useEffect, useMemo, useState, ReactNode } from 'react';
import { DeckContextData, DeckContextState } from './DeckContextData';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../types/Card/ICard';
import { DeckUtils, IDeck } from '../../types/Deck';
import { DeckContext } from './DeckContext';
import { Navigate, useParams } from 'react-router';
import { useBrainContext } from '../store/useBrainContext';
import { useDeckManager } from '../../deckManager/useDeckManager';
import { useAppContext } from '../../appContext/useAppContext';
import { RouteFallback } from '../routing/RouteFallback';
import { useTranslation } from 'react-i18next';
import { getCardPath } from '../routing/routePaths';

/**
 * Resolves the route's deck and card against the active language before
 * creating deck state. Deck-only routes start at the first card, while missing
 * route data remains a recoverable state outside the deck context.
 */
export const DeckContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { deckId, cardId } = useParams<{ deckId: string; cardId: string }>();
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

  if (!cardId) {
    return <Navigate to={getCardPath(deck.id, deck.cards[0].id)} replace />;
  }

  const card = DeckUtils.findCard(deck, cardId);
  if (!card) {
    return (
      <RouteFallback title={t('routing.cardNotFoundTitle')}>
        {t('routing.cardNotFoundMessage', { cardId, deckTitle: deck.title })}
      </RouteFallback>
    );
  }

  console.debug(`Rendering DeckContextProvider for deck ${deck.id}, card ${card.id}`);

  return (
    <DeckContextLoader deck={deck} cardId={card.id}>
      {children}
    </DeckContextLoader>
  );
};

const DeckContextLoader: React.FC<{ deck: IDeck; cardId: CardId; children: ReactNode }> = ({
  deck,
  cardId,
  children,
}) => {
  const brainContext = useBrainContext();

  useEffect(() => {
    if (brainContext.currentDeckId !== deck.id) {
      brainContext.selectDeck(deck.id, true);
    }
  }, [brainContext, deck.id]);

  if (brainContext.currentDeckId !== deck.id) {
    return null;
  }

  return (
    <DeckContextCore deck={deck} cardId={cardId}>
      {children}
    </DeckContextCore>
  );
};

const DeckContextCore: React.FC<{
  children: ReactNode;
  deck: IDeck;
  cardId: CardId;
}> = ({ children, deck, cardId }) => {
  console.debug('Rendering DeckContextCore');

  const [deckState, setDeckState] = useState<DeckContextState>({
    cardHistory: new Stack<CardId>([cardId]),
  });

  const deckContext = useMemo(
    () => new DeckContextData(deckState, setDeckState, deck, cardId),
    [cardId, deck, deckState],
  );

  useEffect(() => {
    deckContext.syncCardHistory(cardId);
  }, [cardId, deckContext]);

  return <DeckContext.Provider value={deckContext}>{children}</DeckContext.Provider>;
};
