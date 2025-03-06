import ICardSet, { SetId } from '../interfaces/ICardSet';
import { LangId } from '../store/BrainContextData';
import DataValidator from '../utils/DataValidator';

// gather card sets from content dir
const modules = import.meta.glob('./content/*.tsx', { eager: true });
const cardSets: ICardSet[] = Object.values(modules).map(
  (module) => (module as { default: ICardSet }).default,
);

// first one for each language is the default set
// It can be any set with isDefaultForLanguage
export const availableSetsPerLanguage: Readonly<Record<LangId, Readonly<ICardSet[]>>> = cardSets.reduce(
  (acc, set) => {
    if (!DataValidator.validateCardSet(set)) {
      throw Error(`Invalid card set in database: ${set.title} (id: ${set.id})`);
    }
    if (!acc[set.lang]) {
      acc[set.lang] = []; // Initialize array if not present
    }

    // If the set is the default for its language
    if (set.isDefaultForLanguage) {
      // Check if a default set already exists for this language
      const existingDefault = acc[set.lang].find((s) => s.isDefaultForLanguage);
      if (existingDefault) {
        throw Error(`Multiple default sets found for language: ${set.lang}`);
      }
      acc[set.lang].unshift(set);
    } else {
      acc[set.lang].push(set);
    }

    return acc;
  },
  {} as Record<LangId, ICardSet[]>,
);

export default class CardSetStorage {
  // Returned sets have been validated by DataValidator
  public static getAvailableSets(lang: LangId): Readonly<ICardSet[]> | undefined {
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
