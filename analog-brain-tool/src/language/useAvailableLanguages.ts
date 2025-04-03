
//const fallbackLanguage = 'en';

import { useCardSetManager } from "../cardSets/useCardSetManager";

interface AvailableLanguages {
  languages: string[] // list of available languages
}

// List available language based on what's found in card set.
// Suspense enabled hook
export const useAvailableLanguages = (): AvailableLanguages => {
  const cardSetManager = useCardSetManager();

  const availableSets = cardSetManager.getAvailableSetsPerLanguage();
  return { languages: Object.keys(availableSets) }
};
