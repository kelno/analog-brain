import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState, LangId } from './BrainContextData';
import { BrainContext } from './BrainContext';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../../interfaces/ICard';
import { UrlManager } from '../../../utils/UrlManager/UrlManager';
import { UrlParams } from '../../../utils/UrlManager/UrlParams';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { BrainToolError, BrainToolErrorType } from '../BrainToolErrorHandler';
import { AppContextData } from '../../../appContext/AppContextData';
import { useAppContext } from '../../../appContext/useAppContext';
import { useDeckManager } from '../../../decks/useDeckManager';
import { DeckManager } from '../../../decks/DeckManager';

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
  const { t } = useTranslation();
  const lang = appContext.language;

  console.debug('Rendering BrainContextCore');

  const validateDeckFromUrl = (lang: LangId, urlDeckId: string) => {
    if (urlDeckId) {
      const deck = deckManager.getDeckById(lang, urlDeckId);
      if (!deck) {
        console.log(
          `BrainContextProvider: Trying to load deck ${urlDeckId} from URL but couldn't find it for language ${lang}`,
        );
      }
      return deck;
    }
    return undefined;
  };

  const urlCurrentCard = UrlManager.consumeParam(UrlParams.CARD);
  const urlDeckId = UrlManager.consumeParam(UrlParams.DECK);

  const defaultSetForLanguage = deckManager.getDefaultDeckForLanguage(lang);
  if (!defaultSetForLanguage) {
    const availableDecks = deckManager.getAvailableSetsPerLanguage();
    if (Object.keys(availableDecks).length === 0) {
      const error = 'Could not find any available decks, cant start BrainContext';
      throw new BrainToolError(error, BrainToolErrorType.FAILED_NO_VALID_DECK);
    }

    const fallbackLanguage = Object.keys(availableDecks)[0];
    const error = `No default deck for language ${lang}. Falling back to ${fallbackLanguage}`;
    console.error(error);
    toast.error(t('toast.noDecksForLang', { lang }));
    appContext.setLanguage(fallbackLanguage);
    throw new Error(error);
    // we'll be redrawn when the language changes
  }

  const setFromURL = urlDeckId ? validateDeckFromUrl(lang, urlDeckId) : undefined;
  const defaultDeck = setFromURL ?? defaultSetForLanguage;

  const urlCard = setFromURL ? urlCurrentCard : null;
  const defaultCardId = urlCard ?? defaultDeck.cards[0].id;

  const [brainState, setBrainState] = useState<BrainContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
    currentDeckId: defaultDeck.id,
  });

  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState, deckManager, lang);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};
