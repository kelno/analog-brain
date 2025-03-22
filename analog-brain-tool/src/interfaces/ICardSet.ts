import { LangId } from '../store/BrainContextData';
import { ICard } from './ICard';

export type SetId = string;

/**
   * A card set is a collection of cards that together form a decision tree.
*/
export interface ICardSet {
  /**
     * A unique string to identify the set. Won't be shown to the user.
  */
  id: SetId;
  /**
     * Set title for the user to identify the set
  */
  title: string;
  /**
     * Language code
  */
  lang: LangId;
  /**
     * Whether this set should be the default one for the specified language.
  */
  isDefaultForLanguage: boolean;
  /**
     * The list of cards in this set.
  */
  cards: ICard[];
}

export default ICardSet; 
