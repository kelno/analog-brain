import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import ICardSet, { SetId } from '../interfaces/ICardSet';
import Helpers from '../utils/Helpers';
import { i18n } from 'i18next';

export interface BrainContextState {
  cardHistory: Stack<CardId>; // the top is the current card
  set: SetId;
  lang: LangId;
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

  public selectSet(setId: SetId) {
    const newSet = Helpers.getSetById(setId);
    if (!newSet) {
      console.error('Failed to select set with id + ' + setId);
      return;
    }
    console.debug('BrainContext: Selected set with id ' + setId + ' (' + newSet.title + ')');

    const newCardHistory = new Stack<CardId>([newSet.cards[0].id]);
    this.setState({ ...this.state, set: setId, cardHistory: newCardHistory });
  }

  public get currentSet(): ICardSet | undefined {
    console.debug('BrainContext: get currentSet from selected ' + this.state.set);
    return Helpers.getSetById(this.state.set);
  }

  public get currentSetId(): SetId {
    return this.state.set;
  }

  public get language(): LangId {
    return this.state.lang;
  }

  public setLanguage(lang: LangId) {
    console.debug('Set language ' + lang);
    this.state.lang = lang;
    this.i18n.changeLanguage(lang);
    this.setState({ ...this.state });
  }

  public getShareURLParams() {
    return UrlManager.getShareURLParams(this.state.set, this.currentCard, this.state.lang);
  }
}
