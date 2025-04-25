import { FC } from 'react';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import { ShareButtonSVG } from '../SVGs/ShareButtonSVG';
import { CardNavigationButton } from './CardSelectorButton';
import { useShare } from '../../hooks/useShare';
import { useBrainContext } from './store/useBrainContext';

interface CardNavigationProps {
  handleClickPrevious: () => void;
  handleClickBackToTop: () => void;
  disableBackToTop: boolean;
}

export const CardNavigation: FC<CardNavigationProps> = ({
  handleClickPrevious,
  handleClickBackToTop,
  disableBackToTop,
}) => {
  const brainContext = useBrainContext();
  const { shareFromParams } = useShare();

  const handleShare = () => {
    shareFromParams(brainContext.currentDeckId, brainContext.currentCardId);
  };

  return (
    <div className="flex gap-2">
      <CardNavigationButton disabled={!brainContext.hasCardHistory} onClick={handleClickPrevious}>
        <LeftArrowSVG alt="previous" />
      </CardNavigationButton>
      <CardNavigationButton disabled={disableBackToTop} onClick={handleClickBackToTop}>
        <UpArrowSVG alt="Back-To-Top" />
      </CardNavigationButton>
      <CardNavigationButton onClick={handleShare}>
        <ShareButtonSVG alt="share" />
      </CardNavigationButton>
    </div>
  );
};
