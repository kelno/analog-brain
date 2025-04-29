import { IDeck, DeckId } from '../../../types/Deck/IDeck';
import { DeckManager } from '../../../decks/DeckManager';
import { PersistentStorageManager } from '../../../utils/PersistentStorageManager/PersistentStorageManager';
import { PersistentStorageTypes } from '../../../utils/PersistentStorageManager/PersistentStorageTypes';

export interface BrainContextState {
  currentDeckId: DeckId | null; // the current deck id, null if no deck is selected
}

export type LangId = string;

/* Brain Context is responsible for ... */
export class BrainContextData {
  private state: BrainContextState;
  private setState: (state: BrainContextState) => void;
  private deckStorage: DeckManager;
  private language: LangId;

  constructor(
    brainState: BrainContextState,
    setBrainState: (brainState: BrainContextState) => void,
    deckStorage: DeckManager,
    language: LangId,
  ) {
    this.state = brainState;
    this.setState = setBrainState;
    this.deckStorage = deckStorage;
    this.language = language;
  }

  private _selectDeck(newDeck: IDeck, userRequest: boolean) {
    console.debug('BrainContext: Selected deck with id ' + newDeck.id + ' (' + newDeck.title + ')');

    this.setState({ ...this.state, currentDeckId: newDeck.id });

    if (userRequest) PersistentStorageManager.set(PersistentStorageTypes.CHOSEN_DECK, newDeck.id);
  }

  public selectDeck = (deckId: DeckId, userRequest: boolean = false) => {
    const newDeck = this.deckStorage.getDeckById(this.language, deckId);
    if (!newDeck) {
      console.error('Failed to select deck with id + ' + deckId);
      return;
    }
    this._selectDeck(newDeck, userRequest);
  };

  public closeDeck = () => {
    if (this.state.currentDeckId === null) return;

    console.debug('BrainContext: Closing deck with id ' + this.state.currentDeckId);
    this.setState({ ...this.state, currentDeckId: null });
    PersistentStorageManager.remove(PersistentStorageTypes.CHOSEN_DECK);
  };

  /* Returns:
  - currently selected deck if any.
  - null if no deck is selected.
  - undefined if deck wasn't found. (this is an error state)
  */
  public get currentDeck(): IDeck | undefined | null {
    //console.debug('BrainContext: get currentDeck from selected ' + this.state.currentDeckId);
    return this.state.currentDeckId
      ? this.deckStorage.getDeckById(this.language, this.state.currentDeckId)
      : null;
  }

  public get currentDeckId(): DeckId | null {
    return this.state.currentDeckId;
  }
}
