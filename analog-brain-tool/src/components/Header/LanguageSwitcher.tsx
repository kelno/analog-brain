import React, { useState } from 'react';
import { useContext } from 'react';
import BrainContext from '../../store/BrainContext';
import getAvailableLanguages from '../../language/availableLanguages';
import languagesInfos from '../../language/languageInfo';

const LanguageSwitcher: React.FC = () => {
  const brainContext = useContext(BrainContext);
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    brainContext.setLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = brainContext.language;
  const availableLanguages = getAvailableLanguages();

  const currentFlag = languagesInfos[currentLanguage]?.flag || currentLanguage;

  return (
    <div className="z-50 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 border-2 border-yellow-200 rounded-2xl shadow-lg hover:bg-slate-700 transition-colors"
      >
        {currentFlag}
      </button>

      {isOpen && (
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
      )}
    </div>
  );
};

export default LanguageSwitcher;
