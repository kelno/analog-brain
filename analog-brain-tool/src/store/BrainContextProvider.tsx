import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState } from './BrainContextData';
import BrainContext from './BrainContext';

const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brainState, setBrainState] = useState({} as BrainContextState);
  const brainContext: BrainContextData = new BrainContextData(brainState, setBrainState);

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};

export default BrainContextProvider;
