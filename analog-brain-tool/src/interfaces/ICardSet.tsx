import ICard from './ICard';

export default interface ICardSet {
  id: string;
  title: string;
  cards: ICard[];
}
