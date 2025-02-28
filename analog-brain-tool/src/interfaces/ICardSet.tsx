import ICard from './ICard';

export type SetId = string;

export default interface ICardSet {
  id: SetId;
  title: string;
  cards: ICard[];
}
