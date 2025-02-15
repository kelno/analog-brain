import { FC } from 'react';
import LeftArrowSVG from '../SVGs/LeftArrowSVG';
import UpArrowSVG from '../SVGs/UpArrowSVG';
import CardSelectorButton from './CardSelectorButton';

interface CardSelectorProps {
  extraClassName?: string;
}

const CardSelector: FC<CardSelectorProps> = ({ extraClassName }) => {
  const bordercolor = 'border-amber-300';
  return (
    <div
      key="fixed"
      className={`${
        extraClassName ? extraClassName + ' ' : ''
      }pointer-events-none rounded-2xl ${bordercolor} z-50 absolute inset-0 border-2 transition-all duration-200 ease-in-out`}
    >
      <div className="absolute top-full right-4 flex gap-2">
        <CardSelectorButton className={`${bordercolor}`}>
          <LeftArrowSVG />
        </CardSelectorButton>
        <CardSelectorButton className={`${bordercolor}`}>
          <UpArrowSVG />
        </CardSelectorButton>
      </div>
    </div>
  );
};

export default CardSelector;
