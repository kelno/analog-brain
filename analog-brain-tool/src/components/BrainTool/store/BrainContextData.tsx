import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../../interfaces/ICard';
import { ICardSet, SetId } from '../../../interfaces/ICardSet';
import { CardSetManager } from '../../../cardSets/CardSetManager';

export interface BrainContextState {
  cardHistory: Stack<CardId>; // the top is the current card
  currentSetId: SetId;
}

export type LangId = string;

export class BrainContextData {
  private state: BrainContextState;
  private setState: (state: BrainContextState) => void;
  private cardSetStorage: CardSetManager;
  private language: LangId;

  constructor(
    brainState: BrainContextState,
    setBrainState: (brainState: BrainContextState) => void,
    cardSetStorage: CardSetManager,
    language: LangId,
  ) {
    this.state = brainState;
    this.setState = setBrainState;
    this.cardSetStorage = cardSetStorage;
    this.language = language;
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
      console.debug('BrainContext: Pushed card ' + cardId + ' to history');
      console.debug(this.state.cardHistory);
    }
  };

  public get hasCardHistory(): boolean {
    return this.state.cardHistory.size() > 1;
  }

  // return previous card
  public popCurrentCard = (): CardId | null => {
    if (this.state.cardHistory.isEmpty()) return null;
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

  private _selectSet(newSet: ICardSet) {
    console.debug('BrainContext: Selected set with id ' + newSet.id + ' (' + newSet.title + ')');

    const firstCardId = newSet.cards[0].id;
    const newCardHistory = new Stack<CardId>([firstCardId]);

    this.setState({ ...this.state, currentSetId: newSet.id, cardHistory: newCardHistory });
  }

  public selectSet = (setId: SetId) => {
    const newSet = this.cardSetStorage.getSetById(this.language, setId);
    if (!newSet) {
      console.error('Failed to select set with id + ' + setId);
      return;
    }
    this._selectSet(newSet);
  };

  public get currentSet(): ICardSet | undefined {
    //console.debug('BrainContext: get currentSet from selected ' + this.state.currentSetId);
    return this.cardSetStorage.getSetById(this.language, this.state.currentSetId);
  }

  public get currentSetId(): SetId {
    return this.state.currentSetId;
  }
}
