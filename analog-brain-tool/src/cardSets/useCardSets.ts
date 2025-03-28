import { useSettings } from '../hooks/useSettings';
import { CardSetManager } from './CardSetManager';
import { LangId } from '../store/AppContextData';
import { SetId } from '../interfaces/ICardSet';
import { use } from 'react';

const cardSetManager = new CardSetManager();

export const useCardSets = () => {
  const { indexUrl } = useSettings();

  if (cardSetManager.loadedUrl != indexUrl)
    use(cardSetManager.loadCardSets(indexUrl));
  
  return {
    lastUpdateId: cardSetManager.lastUpdateId,
    getAvailableSets: (lang: LangId) => cardSetManager.getAvailableSets(lang),
    getSetById: (lang: LangId, id: SetId) => cardSetManager.getSetById(lang, id),
    getDefaultSetForLanguage: (lang: LangId) => cardSetManager.getDefaultSetForLanguage(lang),
    getAvailableSetsPerLanguage: () => cardSetManager.getAvailableSetsPerLanguage(),
  };
}
