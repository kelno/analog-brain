import React, { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ColorSwitch } from './ColorSwitch';
import { HamburgerMenuButton } from './HamburgerMenuButton';
import { HamburgerMenuContent } from './HamburgerMenuContent';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  const [hamburgerIsOpen, sethamburgerIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-brain-secondary shadow-md z-50 h-header">
      <div className="mx-auto px-4 flex justify-between items-center py-4 h-full">
        {/* Left side */}
        <div className="flex items-center space-x-4 text-white">
          {/* Hamburger Menu */}
          <HamburgerMenuButton isOpen={hamburgerIsOpen} setIsOpen={sethamburgerIsOpen} />

          {/* Logo & App Name */}
          <div className="text-2xl font-bold">{t('title')}</div>
        </div>

        {/* Right side: Always shown options */}
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
      {hamburgerIsOpen ? <HamburgerMenuContent isOpen={hamburgerIsOpen} /> : null}
    </header>
  );
};
