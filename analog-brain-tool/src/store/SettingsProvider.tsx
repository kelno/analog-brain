import { useState, ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { UrlManager } from '../utils/UrlManager/UrlManager';

const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // console.log('SettingsProvider: SettingsProvider()');
  // console.trace();

  const defaultUrl = `${UrlManager.getBaseURL()}/sets/index.json`;
  const [indexUrl, _setIndexUrl] = useState(localStorage.getItem('indexUrl') || defaultUrl);

  const setIndexUrl = (newUrl: string) => {
    localStorage.setItem('indexUrl', newUrl);
    _setIndexUrl(newUrl);
  };

  const resetIndexUrl = () => {
    localStorage.removeItem('indexUrl');
    _setIndexUrl(defaultUrl);
  };

  console.debug(`SettingsProvider starting with ${indexUrl}`);
  return (
    <SettingsContext.Provider value={{ indexUrl, setIndexUrl, resetIndexUrl, defaultUrl }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
