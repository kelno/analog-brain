import { LangId } from '../components/BrainTool/store/BrainContextData';
import { ICard } from './ICard';

export type DeckId = string;

// current format version
export const CARD_DECK_FORMAT_VERSION: number = 1;
// minimally supported version
export const MINIMAL_CARD_DECK_FORMAT_VERSION: number = 1;

/**
   * A card deck is a collection of cards that together form a decision tree.
*/
export interface IDeck {
  /**
     * A unique string to identify the deck. Won't be shown to the user.
  */
  id: DeckId;
  /**
     * Deck title for the user to identify the deck.
  */
  title: string;
  /**
   * Format version used for the current deck.
   * Non-matching version numbers won't be rejected as long as the required fields are present.
   * This is mainly an helper to warn about version mismatch.
   */
  formatVersion: number;
  /**
     * Language code
  */
  lang: LangId;
  /**
     * Whether this deck should be the default one for the specified language.
  */
  isDefaultForLanguage: boolean;
  /**
   * Author of the deck.
   */
  author?: string;
  /**
   * Free string for the deck creator to use (NYI)
   */
  description?: string;
  /**
     * The list of cards in this deck.
  */
  cards: ICard[];
}

export default IDeck; 
