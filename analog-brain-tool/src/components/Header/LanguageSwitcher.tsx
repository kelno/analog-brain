import React, { useState } from 'react';
import languagesInfos from '../../language/languageInfo';
import { useBrainContext } from '../../hooks/useBrainContext';
import { useAvailableLanguages } from '../../hooks/useAvailableLanguages';

const LanguageSwitcher: React.FC = () => {
  const brainContext = useBrainContext();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = async (lng: string) => {
    await brainContext.setLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = brainContext.language;
  const availableLanguages = useAvailableLanguages();

  const currentFlag = languagesInfos[currentLanguage]?.flag || currentLanguage;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" px-4 py-2 border-2 border-brain-secondary rounded-2xl shadow-lg hover:bg-brain-secondary"
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
                onClick={async () => await changeLanguage(langCode)}
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
