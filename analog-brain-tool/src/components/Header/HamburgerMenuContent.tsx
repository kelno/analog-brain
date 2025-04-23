interface HamburgerMenuContentProps {
  isOpen: boolean;
}

export const HamburgerMenuContent: React.FC<HamburgerMenuContentProps> = ({ isOpen }) => {
  //const { t } = useTranslation();

  return <div>{isOpen ? 'OPEN' : null}</div>;
};
