import React, { Suspense, useRef, useState } from 'react';
import languagesInfos from '../../language/languageInfo';
import { useAvailableLanguages } from '../../hooks/useAvailableLanguages';
import { useAppContext } from '../../hooks/useAppContext';
import { BrainToolError } from '../BrainTool/BrainToolErrorHandler';

export const LanguageSwitcher: React.FC = () => {
  const appContext = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    if (appContext.language != lng) appContext.setLanguage(lng);

    setIsOpen(false);
  };

  const currentLanguage = appContext.language;
  if (!languagesInfos[currentLanguage]) {
    console.error(`Missing language info for language ${currentLanguage}`);
  }
  const currentFlag = languagesInfos[currentLanguage]?.flag || currentLanguage; // fallback to language code if no flag is available

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border-2 border-brain-secondary rounded-2xl shadow-lg hover:bg-brain-secondary"
      >
        {currentFlag}
      </button>
      {isOpen && (
        <Suspense fallback={<></>}>
          <LanguageSwitcherCore changeLanguage={changeLanguage} />
        </Suspense>
      )}
    </div>
  );
};

interface LanguageSwitcherCoreProps {
  changeLanguage: (lng: string) => void;
}

const LanguageSwitcherCore: React.FC<LanguageSwitcherCoreProps> = ({ changeLanguage }) => {
  const availableLanguages = useAvailableLanguages();

  // disabled for now, that seems pretty aggressive to change language if there is any error loading the card sets
  // if (!availableLanguages.includes(currentLanguage)) {
  //   console.log(`Current language is not among available language, defaulting to english.`);
  //   changeLanguage(fallbackLanguage);
  // }

  return (
    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
      {availableLanguages.map((langCode) => {
        const languageInfo = languagesInfos[langCode];
        if (!languageInfo) console.error(`Missing language info for language ${langCode}`);
        return (
          <button
            key={langCode}
            onClick={() => changeLanguage(langCode)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={`Switch to ${languageInfo?.name || langCode}`}
          >
            <span className="mr-2 text-lg">{languageInfo?.flag || langCode}</span>
            <span>{languageInfo?.name || langCode}</span>
          </button>
        );
      })}
    </div>
  );
};
