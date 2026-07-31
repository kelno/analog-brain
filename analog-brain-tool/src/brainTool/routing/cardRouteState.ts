import { CardId } from '../../types/Card';

export interface CardRouteState {
  previousCardIds: CardId[];
}

const NO_PREVIOUS_CARDS: readonly CardId[] = [];

// Keeping the decision trail on each history entry lets browser Back and
// Forward restore both the card URL and the path taken to reach it.
export const getPreviousCardIds = (state: unknown): readonly CardId[] => {
  if (!state || typeof state !== 'object' || !('previousCardIds' in state)) return NO_PREVIOUS_CARDS;

  const { previousCardIds } = state as Partial<CardRouteState>;
  return Array.isArray(previousCardIds) && previousCardIds.every((cardId) => typeof cardId === 'string')
    ? previousCardIds
    : NO_PREVIOUS_CARDS;
};

export const getNextCardRouteState = (
  previousCardIds: readonly CardId[],
  currentCardId: CardId,
): CardRouteState => ({
  previousCardIds: [...previousCardIds, currentCardId],
});
