import React, { useState } from 'react';
import { useSettings } from './settingsContext/useSettings';
import { useTranslation } from 'react-i18next';
import { About } from '../components/About';
import { Button } from '../components/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ColorSwitch } from './ColorSwitch';

export const Settings: React.FC = () => {
  const { indexUrl, defaultUrl, setIndexUrl, resetIndexUrl } = useSettings();
  const isDefaultUrl = indexUrl === defaultUrl;
  const [inputURL, setInputUrl] = useState(isDefaultUrl ? '' : indexUrl);

  const { t } = useTranslation();

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleSave = () => {
    if (inputURL) setIndexUrl(inputURL);
  };

  const handleReset = () => {
    resetIndexUrl();
    setInputUrl('');
  };

  return (
    <div className="rounded-lg p-6 shadow-md mb-6 space-y-8 bg-brain-bg">
      <h2 className="text-2xl font-bold mb-4"> {t('settings.title')}</h2>
      <LanguageSwitcher />
      <ColorSwitch />
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">{t('settings.decksURL')}</label>
          <input
            type="text"
            value={inputURL}
            onChange={handleUrlChange}
            placeholder={indexUrl}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white border-brain-secondary-hover text-white"
          />
        </div>
        <div className="space-x-4">
          <Button handleClick={handleSave}>{t('settings.save')}</Button>
          <Button handleClick={handleReset}>{t('settings.reset')}</Button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">About</h2> {/*TODO translate */}
        <About />
      </div>
    </div>
  );
};
