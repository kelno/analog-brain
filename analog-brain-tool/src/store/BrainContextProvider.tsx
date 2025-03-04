import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState } from './BrainContextData';
import BrainContext from './BrainContext';
import { availableSets } from '../content/cards';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import Helpers from '../utils/Helpers';
import { useTranslation } from 'react-i18next';

const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const getSetFromURL = () => {
    const urlCardSet = UrlManager.getCardSet();
    if (urlCardSet) return Helpers.getSetById(urlCardSet);
    else return undefined;
  };
  // default to first set and first card in it
  const defaultSet = getSetFromURL() ?? availableSets[0];
  const urlCard = UrlManager.getCurrentCard();
  const defaultCardId = urlCard ?? defaultSet.cards[0].id;
  const defaultLang = 'en'; // dummy for now

  UrlManager.clearURLParams();

  const [brainState, setBrainState] = useState<BrainContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
    set: defaultSet.id,
    lang: defaultLang,
    urlCard: urlCard,
  });
  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState, i18n);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};

export default BrainContextProvider;
