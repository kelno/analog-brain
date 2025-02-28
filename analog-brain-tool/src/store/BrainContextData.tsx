import ContextData from './ContextData';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import ICardSet, { SetId } from '../interfaces/ICardSet';
import { availableSets } from '../content/cards';
import Helpers from '../utils/Helpers';

export interface BrainContextState {
  cardHistory: Stack<CardId>;
  set: SetId;
  lang: LangId;
}

export type LangId = string;

/*
What's handled here:
Card history - Not saved between refresh

*/
export class BrainContextData extends ContextData<BrainContextState> {
  private _cardHistory: Stack<CardId>; // the top is the current card
  private _selectedSet: SetId;
  private _lang: LangId;

  protected setState: (state: BrainContextState) => void;

  protected loadState({ cardHistory }: BrainContextState) {
    if (cardHistory) this._cardHistory = cardHistory;
  }

  protected saveState() {
    this.setState({ cardHistory: this._cardHistory, set: this._selectedSet, lang: this._lang });
  }

  constructor(brainState: BrainContextState, setBrainState: (brainState: BrainContextState) => void) {
    super();
    this._cardHistory = new Stack<CardId>();
    // default to first set and first card
    const defaultSet = availableSets[0];
    this._selectedSet = defaultSet.id;
    this._cardHistory.push(defaultSet.cards[0].id);
    this._lang = 'en'; // dummy value

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

  public get cardHistory() {
    return this._cardHistory;
  }

  public get currentCard(): CardId {
    if (this._cardHistory.isEmpty()) throw Error('Card History is empty and should never be'); // TODO: catch this?

    console.debug(this._cardHistory.toArray());
    return this._cardHistory.peek();
  }

  public selectCard(cardId: CardId, pushHistory: boolean) {
    if (pushHistory && this._cardHistory.peek() != cardId) {
      this._cardHistory.push(cardId);
      this.saveState();
      console.debug('Pushed card ' + cardId + ' to history');
      console.debug(this._cardHistory);
    }

    this.refreshURL();
  }

  public get hasCardHistory(): boolean {
    return this._cardHistory.size() > 1;
  }

  // return previous card
  public popCurrentCard(): CardId | null {
    if (this._cardHistory.isEmpty()) return null;
    else {
      this._cardHistory.pop();
      this.saveState();
      if (this._cardHistory.isEmpty()) return null;
      else return this._cardHistory.peek();
    }
  }

  // Go back to root item in history
  public resetHistory() {
    while (this._cardHistory.size() > 1) this._cardHistory.pop();
    this.saveState();
  }

  public selectSet(setId: SetId) {
    const set = Helpers.getSetById(setId);
    if (!set) {
      console.error('Failed to select set with id + ' + setId);
      return;
    }

    this._selectedSet = setId;
    this._cardHistory.clear();
    this._cardHistory.push(set.cards[0].id);
    this.saveState();
    this.refreshURL();
  }

  public get currentSet(): ICardSet | undefined {
    return Helpers.getSetById(this.currentSetId);
  }

  public get currentSetId(): SetId {
    return this._selectedSet;
  }

  public get language(): LangId {
    return this._lang;
  }

  public setLanguage(lang: LangId) {
    console.debug('Set language ' + lang);
    this._lang = lang;
    this.saveState();
    this.refreshURL();
  }

  public refreshURL() {
    if (this._selectedSet) UrlManager.selectSet(this._selectedSet);
    if (this.currentCard) UrlManager.selectCurrentCard(this.currentCard);
    if (this._lang) UrlManager.selectLanguage(this._lang);
  }
}
