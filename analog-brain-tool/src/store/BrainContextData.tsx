import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import ICardSet, { SetId } from '../interfaces/ICardSet';
import { i18n } from 'i18next';
import CardSetStorage from '../cardSets/CardSetStorage';

export interface BrainContextState {
  cardHistory: Stack<CardId>; // the top is the current card
  set: SetId;
  lang: LangId;
  scrollToCard: string | null; // CardSet component will try to scroll to this when loading the set.
}

export type LangId = string;

export class BrainContextData {
  private state: BrainContextState;
  private setState: (state: BrainContextState) => void;
  private i18n: i18n;

  constructor(
    brainState: BrainContextState,
    setBrainState: (brainState: BrainContextState) => void,
    i18n: i18n,
  ) {
    this.state = brainState;
    this.setState = setBrainState;
    this.i18n = i18n;
  }

  // properly triggers state update for the card history
  // A shallow copy is not enough for this one to trigger state updates
  private saveCardHistory() {
    const newCardHistory = this.state.cardHistory.clone();
    this.setState({ ...this.state, cardHistory: newCardHistory });
  }

  public get cardHistory() {
    return this.state.cardHistory;
  }

  public get currentCard(): CardId {
    if (this.state.cardHistory.isEmpty()) throw Error('Card History is empty and should never be');

    return this.state.cardHistory.peek();
  }

  public selectCard(cardId: CardId, pushHistory: boolean) {
    if (pushHistory && this.state.cardHistory.peek() != cardId) {
      this.state.cardHistory.push(cardId);
      this.saveCardHistory();
      console.debug('Pushed card ' + cardId + ' to history');
      console.debug(this.state.cardHistory);
    }
  }

  public get hasCardHistory(): boolean {
    return this.state.cardHistory.size() > 1;
  }

  // return previous card
  public popCurrentCard(): CardId | null {
    if (this.state.cardHistory.isEmpty()) return null;
    else {
      this.state.cardHistory.pop();
      this.saveCardHistory();
      if (this.state.cardHistory.isEmpty()) return null;
      else return this.state.cardHistory.peek();
    }
  }

  // Go back to root item in history
  public resetHistory() {
    while (this.state.cardHistory.size() > 1) this.state.cardHistory.pop();
    this.saveCardHistory();
  }

  private _selectSet(newSet: ICardSet, scrollToFirst: boolean) {
    console.debug('BrainContext: Selected set with id ' + newSet.id + ' (' + newSet.title + ')');

    const firstCardId = newSet.cards[0].id;
    const newCardHistory = new Stack<CardId>([firstCardId]);

    if (scrollToFirst) this.state.scrollToCard = firstCardId;

    this.setState({ ...this.state, set: newSet.id, cardHistory: newCardHistory });
  }

  public selectSet(setId: SetId) {
    const newSet = CardSetStorage.getSetById(this.language, setId);
    if (!newSet) {
      console.error('Failed to select set with id + ' + setId);
      return;
    }
    this._selectSet(newSet, false);
  }

  public get currentSet(): ICardSet | undefined {
    console.debug('BrainContext: get currentSet from selected ' + this.state.set);
    return CardSetStorage.getSetById(this.language, this.state.set);
  }

  public get currentSetId(): SetId {
    return this.state.set;
  }

  public get language(): LangId {
    return this.state.lang;
  }

  // returns success
  public setLanguage(lang: LangId): boolean {
    const defaultSet = CardSetStorage.getDefaultSetForLanguage(lang);
    if (defaultSet === undefined) {
      console.error(`Can't switch language. No available default set for chosen lang ${lang}`);
      return false;
    }

    console.debug('BrainContext: Set language ' + lang);
    this.state.lang = lang;
    this.i18n.changeLanguage(lang);

    this._selectSet(defaultSet, true);

    // already saved by _selectSet call
    // this.setState({ ...this.state });
    return true;
  }

  public popScrollToCard(): CardId | undefined {
    if (this.state.scrollToCard != null) {
      const card = this.state.scrollToCard;
      this.state.scrollToCard = null;
      this.setState({ ...this.state });
      return card;
    } else return undefined;
  }

  public getShareURLParams() {
    return UrlManager.getShareURLParams(this.state.set, this.currentCard, this.state.lang);
  }
}
