import React from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import ColorSwitch from './ColorSwitch';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 w-full bg-slate-700 shadow-md z-50 h-header">
      <div className="mx-auto px-4 flex justify-between items-center py-4 h-full">
        {/* Logo or App Name */}
        <div className="text-2xl font-bold text-white">{t('title')}</div>

        {/* Menu Options */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Color Scheme Toggle Switch */}
          <div className="flex items-center">
            <ColorSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
