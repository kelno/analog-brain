export type CardId = string;
export type CardItemId = string;

export interface ICardItem {
  /**
   * 
   */
  text: string;
  /**
   * Optional reference to a card id to go to when item is selected
   */
  nextCardId?: CardId; 
  /**
   * NYI
   */
  link?: string;
  /**
   * 
   */
  borderColor?: string;
}

export interface ICard {
  /**
   * 
   */
  id: CardId;
  /**
   * 
   */
  title: string;
  /**
   * 
   */
  text?: string;
  /**
   * 
   */
  items: ICardItem[];
}
