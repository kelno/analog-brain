import { useState, ReactNode } from 'react';
import { AppContextData, AppContextState } from './AppContextData';
import { AppContext } from './AppContext';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { useTranslation } from 'react-i18next';
import { UrlParams } from '../utils/UrlManager/UrlParams';

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  console.debug(`AppContextProvider: Render`);

  const urlLanguage = UrlManager.consumeParam(UrlParams.LANG);
  const lang = urlLanguage ?? i18n.language;

  if (i18n.language != lang)
    i18n.changeLanguage(lang);

  const [appState, setAppState] = useState<AppContextState>({
    lang: lang,
  });

  const appContext: AppContextData = new AppContextData(appState, setAppState, i18n);

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
