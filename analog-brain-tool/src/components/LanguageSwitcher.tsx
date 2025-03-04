import React, { useState } from 'react';
import { useContext } from 'react';
import BrainContext from '../store/BrainContext';

const LanguageSwitcher: React.FC = () => {
  const brainContext = useContext(BrainContext);
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    brainContext.setLanguage(lng);
    setIsOpen(false);
  };

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLanguage = brainContext.language;
  const currentFlag = availableLanguages.find((lang) => lang.code === currentLanguage)?.flag || '🌐';

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 border-2 border-amber-400 rounded-2xl shadow-lg hover:bg-slate-700 transition-colors"
      >
        {currentFlag}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={`Switch to ${lang.name}`}
            >
              <span className="mr-2 text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
