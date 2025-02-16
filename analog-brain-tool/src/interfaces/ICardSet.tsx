import ICard from './ICard';

export default interface ICardSet {
  title: string; // used as ID too
  cards: ICard[];
}
