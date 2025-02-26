import ContextData from './ContextData';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';

export interface BrainContextState {
  cardHistory: Stack<CardId>;
}

/*
What's handled here:
Card history - Not saved between refresh

*/
export class BrainContextData extends ContextData<BrainContextState> {
  public _cardHistory: Stack<CardId>; // the top is the current card

  public get cardHistory() {
    return this._cardHistory;
  }

  protected setState: (state: BrainContextState) => void;

  protected loadState({ cardHistory }: BrainContextState) {
    if (cardHistory) this._cardHistory = cardHistory;
  }

  protected saveState() {
    this.setState({ cardHistory: this.cardHistory });
  }

  constructor(brainState: BrainContextState, setBrainState: (brainState: BrainContextState) => void) {
    super();
    this._cardHistory = new Stack<CardId>();

    {
      // if the URL has a hash, use it to initialize our current card
      const hash = window.location.hash.slice(1); // Remove the `#` from the hash
      if (hash) {
        this._cardHistory.push(hash);
      }
    }

    this.loadState(brainState);
    this.setState = setBrainState;
  }

  public selectCard(cardId: CardId) {
    if (this._cardHistory.peek() == cardId) return;

    this._cardHistory.push(cardId);
    this.saveState();
    console.debug('Pushed card ' + cardId + ' to history');
    console.debug(this._cardHistory);
  }

  public clearHistory() {
    this._cardHistory.clear();
    this.saveState();
  }

  public getCardHistorySize(): number {
    return this._cardHistory.size();
  }

  public getPreviousCard(): CardId | null {
    if (this._cardHistory.isEmpty()) return null;
    else return this._cardHistory.peek();
  }

  public popPreviousCard(): CardId | null {
    if (this._cardHistory.isEmpty()) return null;
    else {
      const cardId = this._cardHistory.pop();
      this.saveState();
      return cardId;
    }
  }
}
