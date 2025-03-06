import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<'dark' | 'default' | 'light'>('default');
  const { t } = useTranslation();

  const handleColorSchemeChange = (scheme: 'dark' | 'default' | 'light') => {
    setColorScheme(scheme);
    console.debug('Color scheme changed to:', scheme);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-700 shadow-md z-50 h-header">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo or App Name */}
        <div className="text-2xl font-bold text-white">{t('title')}</div>

        {/* Menu Options */}
        <div className="flex items-center space-x-6">
          <LanguageSwitcher />
          {/* Language Option AI generated */}
          {/*
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <select
              id="language-select"
              className="p-2 border rounded focus:outline-none"
              onChange={(e) => console.log('Language changed to:', e.target.value)}
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        */}

          {/* Color Scheme Toggle Switch */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleColorSchemeChange('dark')}
              className={`p-2 rounded-full ${colorScheme === 'dark' ? 'bg-slate-600' : 'bg-transparent'}`}
              aria-label="Dark Mode"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button
              onClick={() => handleColorSchemeChange('default')}
              className={`p-2 rounded-full ${colorScheme === 'default' ? 'bg-slate-600' : 'bg-transparent'}`}
              aria-label="Default Mode"
            >
              <span className="text-white">Default</span>
            </button>
            <button
              onClick={() => handleColorSchemeChange('light')}
              className={`p-2 rounded-full ${colorScheme === 'light' ? 'bg-slate-600' : 'bg-transparent'}`}
              aria-label="Light Mode"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
