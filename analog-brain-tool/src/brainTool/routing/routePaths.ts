import { CardId } from '../../types/Card';
import { DeckId } from '../../types/Deck';

export const DECK_ROUTE_PATH = '/deck/:deckId';
export const CARD_ROUTE_PATH = '/deck/:deckId/card/:cardId';

export const getDeckPath = (deckId: DeckId) => `/deck/${encodeURIComponent(deckId)}`;

export const getCardPath = (deckId: DeckId, cardId: CardId) =>
  `${getDeckPath(deckId)}/card/${encodeURIComponent(cardId)}`;
