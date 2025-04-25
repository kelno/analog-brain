
//const fallbackLanguage = 'en';

import { useDeckManager } from "../decks/useDeckManager";

interface AvailableLanguages {
  languages: string[] // list of available languages
}

// List available language based on what's found in deck.
// Suspense enabled hook
export const useAvailableLanguages = (): AvailableLanguages => {
  const deckManager = useDeckManager();

  const availableDecks = deckManager.getAvailableSetsPerLanguage();
  return { languages: Object.keys(availableDecks) }
};
