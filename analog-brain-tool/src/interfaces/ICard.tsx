export type CardId = string;

export interface ICardItem {
  text: string;
  nextCardId?: CardId; // Optional reference to a card id
  link?: string;
  borderColor?: string;
}

export default interface ICard {
  id: CardId;
  title: string;
  text?: string;
  items: ICardItem[];
}
