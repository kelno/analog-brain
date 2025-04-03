import { useSettings } from '../settingsContext/useSettings';
import { CardSetManager } from './CardSetManager';
import { useDataValidator } from '../dataValidation/useDataValidator';
import { useSuspenseQuery } from '@tanstack/react-query';

// Suspense enabled hook, loads CardSetManager with current URL from settings
export const useCardSetManager = () : CardSetManager => {
  const { indexUrl } = useSettings();
  const dataValidator = useDataValidator();

  console.debug(`useCardSetManager rendering with ${indexUrl}`);
  return useSuspenseQuery({
    queryKey: ['cardSets', indexUrl],
    queryFn: async (): Promise<CardSetManager> => {
      const cardSetManager = new CardSetManager();
      await cardSetManager.loadCardSets(indexUrl, dataValidator);
      return cardSetManager;
    }
  }).data; // useSuspenseQuery is guaranteed to succeed or throw.
}
