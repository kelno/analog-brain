import { useState, ReactNode, useEffect } from 'react';
import { BrainContextData, BrainContextState, LangId } from './BrainContextData';
import BrainContext from './BrainContext';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import { useTranslation } from 'react-i18next';
import { useCardSetStorage } from '../cardSets/CardSetStorage';

const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const cardSetStorage = useCardSetStorage();

  const getSetFromURL = (lang: LangId, urlCardSetId: string) => {
    if (urlCardSetId) {
      const set = cardSetStorage.getSetById(lang, urlCardSetId);
      if (!set) {
        console.error(
          `Trying to load set ${urlCardSetId} from URL but couldn't find it for language ${lang}`,
        );
      }
      return set;
    }
    return undefined;
  };

  const initializeContext = () => {
    setBrainState({ ...brainState, loaded: false });

    // Extract URL parameters once
    const urlLanguage = UrlManager.getLanguage();
    const urlCurrentCard = UrlManager.getCurrentCard();
    const urlCardSetId = UrlManager.getCardSet();
    UrlManager.clearURLParams();

    let lang = urlLanguage ?? i18n.language;

    const defaultSetForLanguage = cardSetStorage.getDefaultSetForLanguage(lang);
    if (!defaultSetForLanguage) {
      const availableSets = cardSetStorage.getAvailableSetsPerLanguage();
      if (Object.keys(availableSets).length === 0) {
        console.error('No available sets, cant start BrainContext');
        return;
      }
      const fallbackLanguage = Object.keys(availableSets)[0];
      console.error(`No available sets for chosen lang ${lang}. Falling back to ${fallbackLanguage}`);
      lang = fallbackLanguage;
    }

    const setFromURL = urlCardSetId ? getSetFromURL(lang, urlCardSetId) : undefined;
    const defaultSet = setFromURL ?? defaultSetForLanguage;

    if (!defaultSet) {
      console.error('No valid card set found, cant start BrainContext.');
      return;
    }

    const urlCard = setFromURL ? urlCurrentCard : null;
    const defaultCardId = urlCard ?? defaultSet.cards[0].id;

    i18n.changeLanguage(lang);

    setBrainState({
      loaded: true,
      cardHistory: new Stack<CardId>([defaultCardId]),
      set: defaultSet.id,
      lang: lang,
    });
  };

  const [brainState, setBrainState] = useState<BrainContextState>({
    loaded: false,
    cardHistory: new Stack<CardId>([]),
    set: '',
    lang: '',
  });

  // we re initialize the whole context when the loaded card set changes
  useEffect(() => {
    if (cardSetStorage.loadedURL) initializeContext();
  }, [cardSetStorage.loadedURL]); // Reinitialize context when indexUrl changes

  const brainContext: BrainContextData = new BrainContextData(
    brainState,
    setBrainState,
    i18n,
    cardSetStorage,
  );

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};

export default BrainContextProvider;
