import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../types/Card/ICard';
import { IDeck } from '../../types/Deck';

export interface DeckContextState {
  cardHistory: Stack<CardId>; // the top is the current card
}

export type LangId = string;

/* Holds data for currently selected deck */
export class DeckContextData {
  private state: DeckContextState;
  private setState: (state: DeckContextState) => void;
  private _deck: IDeck;
  private _currentCardId: CardId;

  constructor(
    brainState: DeckContextState,
    setBrainState: (brainState: DeckContextState) => void,
    deck: IDeck,
    currentCardId: CardId,
  ) {
    this.state = brainState;
    this.setState = setBrainState;
    this._deck = deck;
    this._currentCardId = currentCardId;
  }

  // properly triggers state update for the card history
  // A shallow copy is not enough for this one to trigger state updates
  private saveCardHistory = () => {
    const newCardHistory = this.state.cardHistory.clone();
    this.setState({ ...this.state, cardHistory: newCardHistory });
  };

  public get currentCardId(): CardId {
    return this._currentCardId;
  }

  public selectCard = (cardId: CardId) => {
    if (this.state.cardHistory.peek() !== cardId) {
      this.state.cardHistory.push(cardId);
      this.saveCardHistory();
      console.debug('DeckContext: Pushed card ' + cardId + ' to history');
      console.debug(this.state.cardHistory);
    }
  };

  // Browser Back and Forward update the route independently, so the local stack
  // follows the shortest matching transition instead of becoming a second source of truth.
  public syncCardHistory = (cardId: CardId) => {
    if (this.state.cardHistory.peek() === cardId) return;

    const existingIndex = this.state.cardHistory.toArray().lastIndexOf(cardId);
    if (existingIndex === -1) {
      this.selectCard(cardId);
      return;
    }

    while (this.state.cardHistory.size() > existingIndex + 1) this.state.cardHistory.pop();
    this.saveCardHistory();
  };

  public get hasCardHistory(): boolean {
    return this.state.cardHistory.size() > 1;
  }

  public popCurrentCard = (): CardId | null => {
    if (this.state.cardHistory.isEmpty() || !this.hasCardHistory) return null;
    else {
      this.state.cardHistory.pop();
      this.saveCardHistory();
      if (this.state.cardHistory.isEmpty()) return null;
      else return this.state.cardHistory.peek();
    }
  };

  // A direct card link has no local history, but Reset must still return to the
  // deck's defined starting point.
  public resetHistory = (): CardId => {
    while (!this.state.cardHistory.isEmpty()) this.state.cardHistory.pop();
    const firstCardId = this._deck.cards[0].id;
    this.state.cardHistory.push(firstCardId);
    this.saveCardHistory();
    return firstCardId;
  };

  public get canReset(): boolean {
    return this.currentCardId !== this._deck.cards[0].id || this.hasCardHistory;
  }

  public get deck(): IDeck {
    return this._deck;
  }
}
