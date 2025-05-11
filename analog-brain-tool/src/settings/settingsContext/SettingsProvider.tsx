import { useState, ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { SettingsContextData, SettingsContextState } from './SettingsContextData';
import { UrlManager } from '../../utils/UrlManager/UrlManager';
import { UrlParams } from '../../utils/UrlManager/UrlParams';
import { PersistentStorageTypes } from '../../utils/PersistentStorageManager/PersistentStorageTypes';
import { PersistentStorageManager } from '../../utils/PersistentStorageManager/PersistentStorageManager';

// We load the deck url from the URL params, only once
const urlFromParam = UrlManager.consumeParam(UrlParams.DECK_URL);
if (urlFromParam) {
  PersistentStorageManager.set(PersistentStorageTypes.DECK_INDEX_URL, urlFromParam);
  console.debug(`SettingsProvider: urlFromParam: ${urlFromParam}`);
}

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // console.log('SettingsProvider: SettingsProvider()');
  // console.trace();

  const defaultUrl = `${UrlManager.getBaseURL()}decks/index.json`;

  // The app starting deck URL is, in order of priority:
  // - Loaded from the URL
  // - Loaded from user settings (local storage)
  // - The default deck from this project
  const [settingsState, setSettingsState] = useState<SettingsContextState>({
    indexUrl:
      urlFromParam || PersistentStorageManager.get(PersistentStorageTypes.DECK_INDEX_URL) || defaultUrl,
  });
  console.debug(`SettingsProvider starting with ${settingsState.indexUrl}`);

  const settingsContext: SettingsContextData = new SettingsContextData(
    settingsState,
    setSettingsState,
    defaultUrl,
  );

  return <SettingsContext.Provider value={settingsContext}>{children}</SettingsContext.Provider>;
};
