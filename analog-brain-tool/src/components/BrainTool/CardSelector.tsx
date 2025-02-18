import { FC, useContext } from 'react';
import LeftArrowSVG from '../SVGs/LeftArrowSVG';
import UpArrowSVG from '../SVGs/UpArrowSVG';
import CardSelectorButton from './CardSelectorButton';
import ShareButtonSVG from '../SVGs/ShareButtonSVG';
import BrainContext from '../../store/BrainContext';

interface CardSelectorProps {
  extraClassName?: string;
  handleClickPrevious: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const CardSelector: FC<CardSelectorProps> = ({ extraClassName, handleClickPrevious }) => {
  const brainContext = useContext(BrainContext);

  const handleClickBackToTop = () => {
    alert('Button clicked!');
  };
  const handleClickShare = () => {
    alert('Button clicked!');
  };

  const bordercolor = 'border-amber-300';
  return (
    <div
      key="fixed"
      className={`${
        extraClassName ? extraClassName + ' ' : ''
      } rounded-2xl ${bordercolor} z-1 absolute inset-0 border-2 pointer-events-none`}
    >
      <div className="absolute top-full right-4 flex gap-2 pointer-events-auto">
        <CardSelectorButton
          disabled={brainContext.getCardHistorySize() <= 1}
          onClick={handleClickPrevious}
          className={`${bordercolor}`}
        >
          <LeftArrowSVG alt="previous" />
        </CardSelectorButton>
        <CardSelectorButton onClick={handleClickBackToTop} className={`${bordercolor}`}>
          <UpArrowSVG alt="Back-To-Top" />{' '}
          {/*Seems having a space causes issue on firefox, related to aria-label*/}
        </CardSelectorButton>
        <CardSelectorButton onClick={handleClickShare} className={`${bordercolor}`}>
          <ShareButtonSVG alt="share" />
        </CardSelectorButton>
      </div>
    </div>
  );
};

export default CardSelector;
