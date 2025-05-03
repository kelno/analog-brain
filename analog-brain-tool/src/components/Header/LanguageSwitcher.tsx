import React, { Suspense, useState } from 'react';
import { languagesInfos } from '../../language/languageInfo';
import { useAvailableLanguages } from '../../language/useAvailableLanguages';
import { useAppContext } from '../../appContext/useAppContext';
import { ErrorBoundary } from '../ErrorBoundary';
import { useTranslation } from 'react-i18next';

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
        className="px-4 py-2 border-2 border-brain-secondary-hover rounded-2xl hover:bg-brain-secondary-hover"
      >
        {currentFlag}
      </button>
      {isOpen && <LanguageSwitcherCore changeLanguage={changeLanguage} />}
    </div>
  );
};

interface LanguageSwitcherCoreProps {
  changeLanguage: (lng: string) => void;
}

const LanguageSwitcherCore: React.FC<LanguageSwitcherCoreProps> = ({ changeLanguage }) => {
  const { languages: availableLanguages } = useAvailableLanguages();
  const { t } = useTranslation();

  const fallback = <div>...</div>; // we failed to get the language list... do nothing here.

  return (
    <div className="absolute right-0 mt-2 bg-brain-secondary-light rounded-lg shadow-lg">
      <ErrorBoundary fallback={fallback}>
        <Suspense fallback={t(`suspenseLoading`)}>
          {availableLanguages.map((langCode) => {
            const languageInfo = languagesInfos[langCode];
            if (!languageInfo)
              console.error(`LanguageSwitcherCore: Missing language info for language ${langCode}`);
            return (
              <button
                key={langCode}
                onClick={() => changeLanguage(langCode)}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-brain-secondary transition-colors"
                aria-label={`Switch to ${languageInfo?.name || langCode}` /*TODO translate*/}
              >
                <span className="mr-2 text-lg">{languageInfo?.flag || langCode}</span>
                <span>{languageInfo?.name || langCode}</span>
              </button>
            );
          })}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
