import { CardId } from '../../types/Card/ICard';
import { IDeck } from '../../types/Deck';

export type LangId = string;

/**
 * Exposes the validated deck route and the decision trail restored with the
 * current browser history entry.
 */
export class DeckContextData {
  private _deck: IDeck;
  private _currentCardId: CardId;
  private _previousCardIds: readonly CardId[];

  constructor(deck: IDeck, currentCardId: CardId, previousCardIds: readonly CardId[]) {
    this._deck = deck;
    this._currentCardId = currentCardId;
    this._previousCardIds = previousCardIds;
  }

  public get currentCardId(): CardId {
    return this._currentCardId;
  }

  public get hasCardHistory(): boolean {
    return this._previousCardIds.length > 0;
  }

  public get canReset(): boolean {
    return this.currentCardId !== this._deck.cards[0].id || this.hasCardHistory;
  }

  public get previousCardIds(): readonly CardId[] {
    return this._previousCardIds;
  }

  public get deck(): IDeck {
    return this._deck;
  }
}
