import { useState, ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { SettingsContextData, SettingsContextState } from './SettingsContextData';

const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // console.log('SettingsProvider: SettingsProvider()');
  // console.trace();

  const defaultUrl = `${UrlManager.getBaseURL()}/sets/index.json`;

  const [settingsState, setSettingsState] = useState<SettingsContextState>({
    indexUrl: localStorage.getItem('indexUrl') || defaultUrl,
  });
  console.debug(`SettingsProvider starting with ${settingsState.indexUrl}`);

  const settingsContext: SettingsContextData = new SettingsContextData(
    settingsState,
    setSettingsState,
    defaultUrl,
  );

  return <SettingsContext.Provider value={settingsContext}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
