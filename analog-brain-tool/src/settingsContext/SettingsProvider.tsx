import { useState, ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { SettingsContextData, SettingsContextState } from './SettingsContextData';
import { UrlParams } from '../utils/UrlManager/UrlParams';

const urlFromParam = UrlManager.consumeParam(UrlParams.DECK_URL);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // console.log('SettingsProvider: SettingsProvider()');
  // console.trace();

  const defaultUrl = `${UrlManager.getBaseURL()}sets/index.json`;

  // The app starting deck URL is, in order of priority:
  // - Loaded from the URL
  // - Loaded from user settings (local storage)
  // - The default deck from this project
  const [settingsState, setSettingsState] = useState<SettingsContextState>({
    indexUrl: urlFromParam || localStorage.getItem('indexUrl') || defaultUrl,
  });
  console.debug(`SettingsProvider starting with ${settingsState.indexUrl}`);

  const settingsContext: SettingsContextData = new SettingsContextData(
    settingsState,
    setSettingsState,
    defaultUrl,
  );

  return <SettingsContext.Provider value={settingsContext}>{children}</SettingsContext.Provider>;
};
