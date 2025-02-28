import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState } from './BrainContextData';
import BrainContext from './BrainContext';
import { availableSets } from '../content/cards';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';
import UrlManager from '../utils/UrlManager';
import Helpers from '../utils/Helpers';

const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getSetFromURL = () => {
    const urlCardSet = UrlManager.getCardSet();
    if (urlCardSet) return Helpers.getSetById(urlCardSet);
    else return undefined;
  };
  // default to first set and first card in it
  const defaultSet = getSetFromURL() ?? availableSets[0];
  const defaultCardId = UrlManager.getCurrentCard() ?? defaultSet.cards[0].id;
  const defaultLang = 'en'; // dummy for now

  UrlManager.clearURLParams();

  const [brainState, setBrainState] = useState<BrainContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
    set: defaultSet.id,
    lang: defaultLang,
  });
  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};

export default BrainContextProvider;
