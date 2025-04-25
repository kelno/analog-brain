import { LangId } from '../components/BrainTool/store/BrainContextData';
import { ICard } from './ICard';

export type DeckId = string;

// current format version
export const CARD_SET_FORMAT_VERSION: number = 1;
// minimally supported version
export const MINIMAL_CARD_SET_FORMAT_VERSION: number = 1;

/**
   * A card set is a collection of cards that together form a decision tree.
*/
export interface IDeck {
  /**
     * A unique string to identify the set. Won't be shown to the user.
  */
  id: DeckId;
  /**
     * Set title for the user to identify the set.
  */
  title: string;
  /**
   * Format version used for the current set.
   * Non-matching version numbers won't be rejected as long as the required fields are present.
   * This is mainly an helper to warn about version mismatch.
   */
  formatVersion: number;
  /**
     * Language code
  */
  lang: LangId;
  /**
     * Whether this set should be the default one for the specified language.
  */
  isDefaultForLanguage: boolean;
  /**
   * Free string for the set creator to use (NYI)
   */
  description?: string;
  /**
     * The list of cards in this set.
  */
  cards: ICard[];
}

export default IDeck; 
