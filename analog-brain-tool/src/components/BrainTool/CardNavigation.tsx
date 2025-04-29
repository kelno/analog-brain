import { FC } from 'react';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import { ShareButtonSVG } from '../SVGs/ShareButtonSVG';
import { CardNavigationButton } from './CardSelectorButton';
import { useShare } from '../../hooks/useShare';
import { useDeckContext } from './Deck/useDeckContext';

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
  const context = useDeckContext();
  const { shareFromParams } = useShare();

  const handleShare = () => {
    shareFromParams(context.deck.id, context.currentCardId);
  };

  return (
    <div className="flex gap-2">
      <CardNavigationButton disabled={!context.hasCardHistory} onClick={handleClickPrevious}>
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
