import { LangId } from '../store/BrainContextData';
import ICard from './ICard';

export type SetId = string;

export default interface ICardSet {
  id: SetId;
  title: string;
  lang: LangId;
  cards: ICard[];
}
