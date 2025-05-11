import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { HamburgerMenuButton } from './HamburgerMenuButton';
import { HamburgerMenuContent } from './HamburgerMenuContent';

const APP_TITLE = 'Analog Brain';

export const Header: React.FC = () => {
  const [hamburgerIsOpen, sethamburgerIsOpen] = useState(false);

  return (
    <header className="top-0 left-0 w-full bg-brain-secondary shadow-md z-50 h-15">
      <div className="mx-auto px-4 flex justify-between items-center py-4 h-full text text-brain-header">
        {/* Left side: Logo & Title */}
        <div className="flex items-center justify-center text-nowrap space-x-2 truncate">
          <a href="#">
            <Brain />
          </a>
          <div className="text-xl font-bold truncate">{APP_TITLE}</div>
        </div>

        {/* Right side: Always shown options */}
        <div className="flex items-center space-x-6 flex-shrink-0">
          {/* Hamburger Menu */}
          <HamburgerMenuButton isOpen={hamburgerIsOpen} setIsOpen={sethamburgerIsOpen} />
        </div>
      </div>
      {hamburgerIsOpen ? <HamburgerMenuContent isOpen={hamburgerIsOpen} /> : null}
    </header>
  );
};
