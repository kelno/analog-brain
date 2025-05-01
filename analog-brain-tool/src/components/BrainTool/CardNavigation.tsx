import { FC } from 'react';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import { ShareButtonSVG } from '../SVGs/ShareButtonSVG';
import { CardNavigationButton } from './CardSelectorButton';
import { useShare } from '../../hooks/useShare';
import { useDeckContext } from './Deck/useDeckContext';

interface CardNavigationProps {
  disableBackToTop: boolean;
}

export const CardNavigation: FC<CardNavigationProps> = ({ disableBackToTop }) => {
  const context = useDeckContext();
  const { shareFromParams } = useShare();

  const handleClickPrevious = () => {
    console.log('Click previous');
    context.popCurrentCard();
  };

  const handleClickBackToTop = () => {
    context.resetHistory();
  };

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
