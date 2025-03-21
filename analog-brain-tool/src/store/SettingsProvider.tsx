import { useState, ReactNode } from 'react';
import SettingsContext from './SettingsContext';
import UrlManager from '../utils/UrlManager';

const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultURL = `${UrlManager.getBaseURL()}/sets/index.json`;
  const [indexUrl, setIndexUrl] = useState(localStorage.getItem('indexUrl') || defaultURL);

  console.debug(`SettingsProvider starting with ${indexUrl}`);
  return <SettingsContext.Provider value={{ indexUrl, setIndexUrl }}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
