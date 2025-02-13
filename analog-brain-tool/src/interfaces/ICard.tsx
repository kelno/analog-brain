export interface ICardItem {
  text: string;
  nextCardId?: string; // Optional reference to a card id
  link?: string;
}

export default interface ICard {
  id: string;
  title: string;
  items: ICardItem[];
}
