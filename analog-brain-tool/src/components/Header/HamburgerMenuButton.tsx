import Hamburger from 'hamburger-react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface HamburgerMenuButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <>
      <Hamburger label={t('hamburger.buttonLabel')} toggled={isOpen} toggle={setIsOpen} />
    </>
  );
};
