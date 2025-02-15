import { FC } from 'react';

interface CardSelectorProps {
  extraClassName?: string;
}

const CardSelector: FC<CardSelectorProps> = ({ extraClassName }) => {
  return (
    <div
      key="fixed"
      className={`${
        extraClassName ? extraClassName + ' ' : ''
      }pointer-events-none rounded-2xl border-amber-300 z-50 absolute inset-0 border-2 transition-all duration-200 ease-in-out`}
    ></div>
  );
};

export default CardSelector;
