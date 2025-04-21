import { FC } from 'react';
import { CardId, ICardItem } from '../../interfaces/ICard';

interface CardItemProps {
  carditem: ICardItem;
  handleClickCard: (id: CardId, isPrevious: boolean) => void;
}

export const CardItem: FC<CardItemProps> = ({ carditem, handleClickCard }) => {
  const isClickable = !!carditem.nextCardId;

  const handleClick = (event: React.MouseEvent) => {
    if (isClickable) {
      event.stopPropagation(); // Prevent the click event from bubbling up to the parent card
      handleClickCard(carditem.nextCardId!, false);
    }
  };

  return (
    <li
      className={`p-2 border rounded ${isClickable ? 'cursor-pointer hover:bg-gray-200' : ''}`}
      style={{ borderColor: carditem.borderColor || 'inherit' }}
      onClick={handleClick}
    >
      <pre>{carditem.text}</pre>
      {/* {isClickable && (
        <span>
          {' '}
          {' ➜ '}({carditem.nextCardId})
        </span>
      )} */}
    </li>
  );
};
