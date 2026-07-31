import { useEffect, useMemo, ReactNode } from 'react';
import { DeckContextData } from './DeckContextData';
import { CardId } from '../../types/Card/ICard';
import { DeckUtils, IDeck } from '../../types/Deck';
import { DeckContext } from './DeckContext';
import { Navigate, useLocation, useParams } from 'react-router';
import { useBrainContext } from '../store/useBrainContext';
import { useDeckManager } from '../../deckManager/useDeckManager';
import { useAppContext } from '../../appContext/useAppContext';
import { RouteFallback } from '../routing/RouteFallback';
import { useTranslation } from 'react-i18next';
import { getCardPath } from '../routing/routePaths';
import { getPreviousCardIds } from '../routing/cardRouteState';

/**
 * Resolves the route's deck and card against the active language before
 * creating deck context. Deck-only routes start at the first card, browser
 * history restores the decision trail, and missing route data remains a
 * recoverable state outside the deck context.
 */
export const DeckContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { deckId, cardId } = useParams<{ deckId: string; cardId: string }>();
  const location = useLocation();
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
    <DeckContextLoader
      deck={deck}
      cardId={card.id}
      previousCardIds={getPreviousCardIds(location.state)}
    >
      {children}
    </DeckContextLoader>
  );
};

const DeckContextLoader: React.FC<{
  deck: IDeck;
  cardId: CardId;
  previousCardIds: readonly CardId[];
  children: ReactNode;
}> = ({ deck, cardId, previousCardIds, children }) => {
  const brainContext = useBrainContext();
  const deckContext = useMemo(
    () => new DeckContextData(deck, cardId, previousCardIds),
    [cardId, deck, previousCardIds],
  );

  useEffect(() => {
    if (brainContext.currentDeckId !== deck.id) {
      brainContext.selectDeck(deck.id, true);
    }
  }, [brainContext, deck.id]);

  if (brainContext.currentDeckId !== deck.id) {
    return null;
  }

  return <DeckContext.Provider value={deckContext}>{children}</DeckContext.Provider>;
};
