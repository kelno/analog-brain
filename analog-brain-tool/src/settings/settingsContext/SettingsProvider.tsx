import { useEffect, useState, ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { SettingsContextData, SettingsContextState } from './SettingsContextData';
import { UrlManager } from '../../utils/UrlManager/UrlManager';
import { PersistentStorageTypes } from '../../utils/PersistentStorageManager/PersistentStorageTypes';
import { PersistentStorageManager } from '../../utils/PersistentStorageManager/PersistentStorageManager';

interface SettingsProviderProps {
  children: ReactNode;
  initialIndexUrl: string | null;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, initialIndexUrl }) => {
  const defaultUrl = `${UrlManager.getBaseURL()}decks/index.json`;

  // The app starting deck URL is, in order of priority:
  // - Loaded from the URL
  // - Loaded from user settings (local storage)
  // - The default deck from this project
  const [settingsState, setSettingsState] = useState<SettingsContextState>(() => ({
    indexUrl:
      initialIndexUrl || PersistentStorageManager.get(PersistentStorageTypes.DECK_INDEX_URL) || defaultUrl,
  }));

  useEffect(() => {
    if (initialIndexUrl) {
      PersistentStorageManager.set(PersistentStorageTypes.DECK_INDEX_URL, initialIndexUrl);
    }
  }, [initialIndexUrl]);

  console.debug(`SettingsProvider starting with ${settingsState.indexUrl}`);

  const settingsContext: SettingsContextData = new SettingsContextData(
    settingsState,
    setSettingsState,
    defaultUrl,
  );

  return <SettingsContext.Provider value={settingsContext}>{children}</SettingsContext.Provider>;
};
