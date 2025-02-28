import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState } from './BrainContextData';
import BrainContext from './BrainContext';
import { availableSets } from '../content/cards';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../interfaces/ICard';

const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // default to first set and first card in it
  const defaultSet = availableSets[0];
  const defaultState: BrainContextState = {
    cardHistory: new Stack<CardId>([defaultSet.cards[0].id]),
    set: defaultSet.id,
    lang: 'en', // dummy for now
  };

  const [brainState, setBrainState] = useState(defaultState);
  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};

export default BrainContextProvider;
