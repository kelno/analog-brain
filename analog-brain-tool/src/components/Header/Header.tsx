import React, { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ColorSwitch } from './ColorSwitch';
import { HamburgerMenuButton } from './HamburgerMenuButton';
import { HamburgerMenuContent } from './HamburgerMenuContent';
import { Brain } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  const [hamburgerIsOpen, sethamburgerIsOpen] = useState(false);

  return (
    <header className="top-0 left-0 w-full bg-brain-secondary shadow-md z-50 h-15">
      <div className="mx-auto px-4 flex justify-between items-center py-4 h-full text text-brain-header">
        {/* Left side: Logo & Title */}
        <div className="flex items-center justify-center text-nowrap space-x-2 truncate">
          <a href="#">
            <Brain />
          </a>
          <div className="text-xl font-bold truncate">{t('title')}</div>
        </div>

        {/* Right side: Always shown options */}
        <div className="flex items-center space-x-6 flex-shrink-0">
          <LanguageSwitcher />

          {/* Color Scheme Toggle Switch */}
          <ColorSwitch />

          {/* Hamburger Menu */}
          <HamburgerMenuButton isOpen={hamburgerIsOpen} setIsOpen={sethamburgerIsOpen} />
        </div>
      </div>
      {hamburgerIsOpen ? <HamburgerMenuContent isOpen={hamburgerIsOpen} /> : null}
    </header>
  );
};
