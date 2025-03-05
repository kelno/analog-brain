import { useState, ReactNode, useEffect } from 'react';
import { BrainContextData, BrainContextState, LangId } from './BrainContextData';
import BrainContext from './BrainContext';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import { useTranslation } from 'react-i18next';
import CardSetHelpers from '../utils/CardSetHelpers';

const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const getSetFromURL = (lang: LangId) => {
    const urlCardSetId = UrlManager.getCardSet();
    if (urlCardSetId) {
      const set = CardSetHelpers.getSetById(lang, urlCardSetId);
      if (!set) {
        console.error(
          `Trying to load set ${urlCardSetId} from URL but couldn't find it for language ${lang}`,
        );
      }
      return set;
    } else return undefined;
  };
  // default to first set and first card in it
  let lang = UrlManager.getLanguage() ?? i18n.language; // else let i18n pick default
  if (CardSetHelpers.getDefaultSetForLanguage(lang) === undefined) {
    console.error(`No available sets for chosen lang ${lang}. Defaulting to english.`);
    lang = 'en';
  }
  const defaultSetForLanguage = CardSetHelpers.getDefaultSetForLanguage(lang);
  if (!defaultSetForLanguage) {
    throw new Error(`No available sets for lang ${lang}`);
  }
  const setFromURL = getSetFromURL(lang);
  const defaultSet = setFromURL ?? defaultSetForLanguage;
  const urlCard = setFromURL ? UrlManager.getCurrentCard() : null;
  const defaultCardId = urlCard ?? defaultSet.cards[0].id;

  // handle setting langague from URL. Weird place to do it maybe.
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  UrlManager.clearURLParams();

  const [brainState, setBrainState] = useState<BrainContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
    set: defaultSet.id,
    lang: lang,
    scrollToCard: urlCard,
  });
  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState, i18n);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};

export default BrainContextProvider;
