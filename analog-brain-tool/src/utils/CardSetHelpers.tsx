import { availableSetsPerLanguage } from '../content/cards';
import ICardSet, { SetId } from '../interfaces/ICardSet';
import { LangId } from '../store/BrainContextData';

export default class CardSetHelpers {
  // Returned sets have been validated by DataValidator
  public static getAvailableSets(lang: LangId): ICardSet[] | undefined {
    return availableSetsPerLanguage[lang];
  }

  public static getSetById(lang: LangId, id: SetId) {
    return this.getAvailableSets(lang)?.find((set) => set.id === id);
  }

  // Returned set has been validated by DataValidator
  public static getDefaultSetForLanguage(lang: LangId): ICardSet | undefined {
    return this.getAvailableSets(lang)?.[0];
  }
}
