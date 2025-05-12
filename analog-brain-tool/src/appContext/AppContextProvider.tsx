import { useState, ReactNode } from 'react';
import { AppContextData, AppContextState } from './AppContextData';
import { AppContext } from './AppContext';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { useTranslation } from 'react-i18next';
import { UrlParams } from '../utils/UrlManager/UrlParams';
//import { useAppStore } from './appStore';

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  //const { lang, setLanguage } = useAppStore();

  console.debug(`AppContextProvider: Render`);

  const urlLanguage = UrlManager.consumeParam(UrlParams.LANG);
  const initialLang = urlLanguage ?? i18n.language;

  if (i18n.language != initialLang) i18n.changeLanguage(initialLang);

  const [appState, setAppState] = useState<AppContextState>({
    lang: initialLang,
  });

  const appContext: AppContextData = new AppContextData(appState, setAppState, i18n);

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
