import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState, LangId } from './BrainContextData';
import { BrainContext } from './BrainContext';
import { UrlManager } from '../../utils/UrlManager/UrlManager';
import { UrlParams } from '../../utils/UrlManager/UrlParams';
import { AppContextData } from '../../appContext/AppContextData';
import { useAppContext } from '../../appContext/useAppContext';
import { useDeckManager } from '../../deckManager/useDeckManager';
import { DeckManager } from '../../deckManager/DeckManager';
import { PersistentStorageManager } from '../../utils/PersistentStorageManager/PersistentStorageManager';
import { PersistentStorageTypes } from '../../utils/PersistentStorageManager/PersistentStorageTypes';

export const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.debug('rendering BrainContextProvider');
  const deckManager = useDeckManager();
  const appContext = useAppContext();

  // We recreate the brain context every time decks or lang changes
  const key = `${deckManager.lastUpdateId}_${appContext.language}`;

  return (
    <BrainContextCore deckManager={deckManager} appContext={appContext} key={key}>
      {children}
    </BrainContextCore>
  );
};

// can throw
// This provider will generate a fresh new context every time it's re rendered
export const BrainContextCore: React.FC<{
  children: ReactNode;
  appContext: AppContextData;
  deckManager: DeckManager;
}> = ({ children, appContext, deckManager }) => {
  //const { t } = useTranslation();
  const lang = appContext.language;

  console.debug('Rendering BrainContextCore');

  const validateDeckFromUrl = (lang: LangId, urlDeckId: string) => {
    if (urlDeckId) {
      const deck = deckManager.getDeckById(lang, urlDeckId);
      if (deck === undefined) {
        console.error(
          `BrainContextCore: Trying to load deck ${urlDeckId} from URL but couldn't find it for language ${lang}`,
        );
        return undefined;
      }
      return deck;
    }
    return undefined;
  };

  const getDeckFromURL = () => {
    const urlDeckId = UrlManager.consumeParam(UrlParams.DECK);
    return urlDeckId ? validateDeckFromUrl(lang, urlDeckId) : undefined;
  };

  const getLastExplicitelySelectedDeck = () => {
    const lastSelectedDeckId = PersistentStorageManager.get(PersistentStorageTypes.CHOSEN_DECK);
    const lastSelectedDeck = lastSelectedDeckId
      ? deckManager.getDeckById(lang, lastSelectedDeckId)
      : undefined;
    console.debug('Using last explicitely selected deck', lastSelectedDeckId);
    return lastSelectedDeck;
  };

  // Priority: URL > last selected deck > default deck
  const deckFromURL = getDeckFromURL();
  const currentDeck = deckFromURL ?? getLastExplicitelySelectedDeck() ?? null;

  const [brainState, setBrainState] = useState<BrainContextState>({
    currentDeckId: currentDeck ? currentDeck.id : null,
  });

  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState, deckManager, lang);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};
