import { useSettings } from '../hooks/useSettings';
import { CardSetManager } from './CardSetManager';
import { LangId } from '../store/AppContextData';
import { SetId } from '../interfaces/ICardSet';
import { usePromise } from "@mittwald/react-use-promise";
import { useState } from 'react';

const cardSetManager = new CardSetManager();

export const useCardSets = () => {
  const { indexUrl } = useSettings();
  const [ lastUpdateId, setLastUpdateId ] = useState<string>(crypto.randomUUID());

  /*const sets =*/ usePromise(
    async (indexUrl: string) => { 
      await cardSetManager.loadCardSets(indexUrl); 
      setLastUpdateId(crypto.randomUUID()) 
    }, [indexUrl]
  );

  return {
    lastUpdateId,
    getAvailableSets: (lang: LangId) => cardSetManager.getAvailableSets(lang),
    getSetById: (lang: LangId, id: SetId) => cardSetManager.getSetById(lang, id),
    getDefaultSetForLanguage: (lang: LangId) => cardSetManager.getDefaultSetForLanguage(lang),
    getAvailableSetsPerLanguage: () => cardSetManager.getAvailableSetsPerLanguage(),
  };
}
