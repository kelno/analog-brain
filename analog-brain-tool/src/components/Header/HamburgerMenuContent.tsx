import { Settings } from '../Settings';

interface HamburgerMenuContentProps {
  isOpen: boolean;
}

export const HamburgerMenuContent: React.FC<HamburgerMenuContentProps> = ({ isOpen }) => {
  //const { t } = useTranslation();

  if (isOpen === false) return null;

  return <Settings />;
};
