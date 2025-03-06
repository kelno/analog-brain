import { availableSetsPerLanguage } from '../cardSets/CardSetStorage';

// return array of language code
export default function getAvailableLanguages(): string[] {
  // just list every language having at least one set
  return Object.keys(availableSetsPerLanguage);
}
