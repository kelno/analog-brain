import { useSettings } from '../settingsContext/useSettings';
import { DeckManager } from './DeckManager';
import { useDataValidator } from '../dataValidation/useDataValidator';
import { useSuspenseQuery } from '@tanstack/react-query';

// Suspense enabled hook, loads DeckManager with current URL from settings
export const useDeckManager = () : DeckManager => {
  const { indexUrl } = useSettings();
  const dataValidator = useDataValidator();

  console.debug(`useDeckManager rendering with ${indexUrl}`);
  return useSuspenseQuery({
    queryKey: ['decks', indexUrl],
    queryFn: async (): Promise<DeckManager> => {
      const deckManager = new DeckManager();
      await deckManager.loadDecks(indexUrl, dataValidator);
      return deckManager;
    }
  }).data; // useSuspenseQuery is guaranteed to succeed or throw.
}
