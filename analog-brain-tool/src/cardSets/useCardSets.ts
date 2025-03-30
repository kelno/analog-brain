import { useSettings } from '../settingsContext/useSettings';
import { CardSetManager } from './CardSetManager';
import { LangId } from '../appContext/AppContextData';
import { SetId } from '../interfaces/ICardSet';
import { use } from 'react';
import { useDataValidator } from '../dataValidation/useDataValidator';

const cardSetManager = new CardSetManager();

export const useCardSets = () => {
  const { indexUrl } = useSettings();
  const dataValidator = useDataValidator();

  if (cardSetManager.loadedUrl != indexUrl)
    use(cardSetManager.loadCardSets(indexUrl, dataValidator));
  
  return {
    lastUpdateId: cardSetManager.lastUpdateId,
    errors: cardSetManager.errors,
    getAvailableSets: (lang: LangId) => cardSetManager.getAvailableSets(lang),
    getSetById: (lang: LangId, id: SetId) => cardSetManager.getSetById(lang, id),
    getDefaultSetForLanguage: (lang: LangId) => cardSetManager.getDefaultSetForLanguage(lang),
    getAvailableSetsPerLanguage: () => cardSetManager.getAvailableSetsPerLanguage(),
  };
}
