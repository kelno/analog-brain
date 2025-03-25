import { useSettings } from '../hooks/useSettings';
import { CardSetManager } from './CardSetManager';
import { LangId } from '../store/AppContextData';
import { SetId } from '../interfaces/ICardSet';
import { usePromise } from "@mittwald/react-use-promise";

const cardSetManager = new CardSetManager();

export function useCardSets() {
  const { indexUrl } = useSettings();

  const sets = usePromise((indexUrl: string) => cardSetManager.loadCardSets(indexUrl), [indexUrl]);
  const lastUpdateId = crypto.randomUUID();

  return {
    lastUpdateId,
    sets,
    getAvailableSets: (lang: LangId) => cardSetManager.getAvailableSets(lang),
    getSetById: (lang: LangId, id: SetId) => cardSetManager.getSetById(lang, id),
    getDefaultSetForLanguage: (lang: LangId) => cardSetManager.getDefaultSetForLanguage(lang),
    getAvailableSetsPerLanguage: () => cardSetManager.getAvailableSetsPerLanguage(),
  };
}
