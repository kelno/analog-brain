import { FC } from 'react';
import LeftArrowSVG from '../SVGs/LeftArrowSVG';
import UpArrowSVG from '../SVGs/UpArrowSVG';
import ShareButtonSVG from '../SVGs/ShareButtonSVG';
import CardSelectorButton from './CardSelectorButton';
import useShare from '../../hooks/useShare';
import { useTranslation } from 'react-i18next';
import { useBrainContext } from '../../hooks/useBrainContext';

interface CardNavigationProps {
  handleClickPrevious: () => void;
  handleClickBackToTop: () => void;
  disableBackToTop: boolean;
}

const CardNavigation: FC<CardNavigationProps> = ({
  handleClickPrevious,
  handleClickBackToTop,
  disableBackToTop,
}) => {
  const brainContext = useBrainContext();
  const { t } = useTranslation();
  const { share } = useShare();

  const getShareURL = () => {
    const params = brainContext.getShareURLParams();
    return `${window.location.href}?${params}`;
  };

  const handleShare = () => {
    share(getShareURL(), t('share.title'), t('share.description'));
  };

  return (
    <div className="flex gap-2">
      <CardSelectorButton disabled={!brainContext.hasCardHistory} onClick={handleClickPrevious}>
        <LeftArrowSVG alt="previous" />
      </CardSelectorButton>
      <CardSelectorButton disabled={disableBackToTop} onClick={handleClickBackToTop}>
        <UpArrowSVG alt="Back-To-Top" />
      </CardSelectorButton>
      <CardSelectorButton onClick={handleShare}>
        <ShareButtonSVG alt="share" />
      </CardSelectorButton>
    </div>
  );
};

export default CardNavigation;
