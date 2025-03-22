import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import { ICardSet, SetId } from '../interfaces/ICardSet';
import { i18n } from 'i18next';
import { useCardSetStorage } from '../cardSets/CardSetStorage';

export interface BrainContextState {
  loaded: boolean;
  cardHistory: Stack<CardId>; // the top is the current card
  set: SetId;
  lang: LangId;
}

export type LangId = string;

export class BrainContextData {
  private state: BrainContextState;
  private setState: (state: BrainContextState) => void;
  private i18n: i18n;
  private cardSetStorage: ReturnType<typeof useCardSetStorage>;

  constructor(
    brainState: BrainContextState,
    setBrainState: (brainState: BrainContextState) => void,
    i18n: i18n,
    cardSetStorage: ReturnType<typeof useCardSetStorage>,
  ) {
    this.state = brainState;
    this.setState = setBrainState;
    this.i18n = i18n;
    this.cardSetStorage = cardSetStorage;
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

  public get currentCard(): CardId {
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

    this.setState({ ...this.state, set: newSet.id, cardHistory: newCardHistory });
  }

  public selectSet = async (setId: SetId) => {
    const newSet = this.cardSetStorage.getSetById(this.language, setId);
    if (!newSet) {
      console.error('Failed to select set with id + ' + setId);
      return;
    }
    this._selectSet(newSet);
  };

  public get currentSet(): ICardSet | undefined {
    console.debug('BrainContext: get currentSet from selected ' + this.state.set);
    return this.cardSetStorage.getSetById(this.language, this.state.set);
  }

  public get currentSetId(): SetId {
    return this.state.set;
  }

  public get language(): LangId {
    return this.state.lang;
  }

  public get loaded(): boolean {
    return this.state.loaded;
  }

  // returns success
  public setLanguage = async (lang: LangId): Promise<boolean> => {
    const defaultSet = this.cardSetStorage.getDefaultSetForLanguage(lang);
    if (defaultSet === undefined) {
      console.error(`Can't switch language. No available default set for chosen lang ${lang}`);
      return false;
    }

    console.debug('BrainContext: Set language ' + lang);
    this.state.lang = lang;
    this.i18n.changeLanguage(lang);

    this._selectSet(defaultSet);

    // already saved by _selectSet call
    // this.setState({ ...this.state });
    return true;
  };

  public getShareURLParams = () => {
    return UrlManager.getShareURLParams(this.state.set, this.currentCard, this.state.lang);
  };
}
