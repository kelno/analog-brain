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

  constructor(
    brainState: DeckContextState,
    setBrainState: (brainState: DeckContextState) => void,
    deck: IDeck,
  ) {
    this.state = brainState;
    this.setState = setBrainState;
    this._deck = deck;
  }

  // properly triggers state update for the card history
  // A shallow copy is not enough for this one to trigger state updates
  private saveCardHistory = () => {
    const newCardHistory = this.state.cardHistory.clone();
    this.setState({ ...this.state, cardHistory: newCardHistory });
  };

  public get cardHistory() {
    return this.state.cardHistory;
  }

  // can throw
  public get currentCardId(): CardId {
    if (this.state.cardHistory.isEmpty()) throw Error('Card History is empty and should never be');

    return this.state.cardHistory.peek();
  }

  // Method to get the previous card ID
  public getPreviousCard = (): CardId | undefined => {
    // Create a temporary stack using the static method fromArray
    const tempHistory = Stack.fromArray<CardId>(this.state.cardHistory.toArray());

    // Pop the current card to access the previous one
    tempHistory.pop();

    // Return the previous card ID if available
    if (tempHistory.isEmpty()) {
      return undefined;
    }
    return tempHistory.peek();
  };

  public selectCard = (cardId: CardId, pushHistory: boolean) => {
    if (pushHistory && this.state.cardHistory.peek() != cardId) {
      this.state.cardHistory.push(cardId);
      this.saveCardHistory();
      console.debug('DeckContext: Pushed card ' + cardId + ' to history');
      console.debug(this.state.cardHistory);
    }
  };

  public get hasCardHistory(): boolean {
    return this.state.cardHistory.size() > 1;
  }

  // return previous card
  public popCurrentCard = (): CardId | null => {
    if (this.state.cardHistory.isEmpty() || !this.hasCardHistory) return null;
    else {
      this.state.cardHistory.pop();
      this.saveCardHistory();
      if (this.state.cardHistory.isEmpty()) return null;
      else return this.state.cardHistory.peek();
    }
  };

  // Go back to root item in history
  public resetHistory = () => {
    while (this.state.cardHistory.size() > 1) this.state.cardHistory.pop();
    this.saveCardHistory();
  };

  public get deck(): IDeck {
    return this._deck;
  }
}
