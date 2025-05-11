import { Settings } from '../settings/Settings';

interface HamburgerMenuContentProps {
  isOpen: boolean;
}

export const HamburgerMenuContent: React.FC<HamburgerMenuContentProps> = ({ isOpen }) => {
  if (isOpen === false) return null;

  return (
    <>
      <Settings />
    </>
  );
};
