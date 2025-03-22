import { LangId } from '../store/BrainContextData';
import { ICard } from './ICard';

export type SetId = string;

export interface ICardSet {
  id: SetId;
  title: string;
  lang: LangId;
  isDefaultForLanguage: boolean;
  cards: ICard[];
}

export default ICardSet; 
