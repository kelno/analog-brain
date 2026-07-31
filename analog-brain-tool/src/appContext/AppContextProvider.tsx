import { useEffect, useState, ReactNode } from 'react';
import { AppContextData, AppContextState } from './AppContextData';
import { AppContext } from './AppContext';
import { useTranslation } from 'react-i18next';

interface AppContextProviderProps {
  children: ReactNode;
  initialLanguage: string | null;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children, initialLanguage }) => {
  const { i18n } = useTranslation();
  const [appState, setAppState] = useState<AppContextState>(() => ({
    lang: initialLanguage ?? i18n.language,
  }));

  useEffect(() => {
    if (i18n.language !== appState.lang) void i18n.changeLanguage(appState.lang);
  }, [appState.lang, i18n]);

  const appContext: AppContextData = new AppContextData(appState, setAppState, i18n);

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
