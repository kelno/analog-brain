export interface ICardItem {
  text: string;
  nextCardId?: string; // Optional reference to a card id
}

export default interface ICard {
  id: string;
  title: string;
  items: ICardItem[];
}
